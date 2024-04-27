import * as functions from "firebase-functions";

const ALGOLIA_ID = functions.config().algolia.appid;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.apikey;
const ALGOLIA_INDEX_NAME = "algorithms";

exports.onAlgorithmCreated = functions.firestore
    .document("algorithms/{algorithmId}")
    .onCreate(async (snap) => {

    if(snap.data().visibility == "private"){
        return;
    }

    const algoliasearch = (await import("algoliasearch")).default;
    const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
    const index = client.initIndex(ALGOLIA_INDEX_NAME);

    return index.saveObject({objectID: snap.id, ...snap.data()});

});

exports.onAlgorithmEdited = functions.firestore
    .document("algorithms/{algorithmId}")
    .onUpdate(async (change) => {

    const algoliasearch = (await import("algoliasearch")).default;
    const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
    const index = client.initIndex(ALGOLIA_INDEX_NAME);

    if(change.after.data().visibility == "private"){

        return index.deleteObject(change.after.id);

    }
    else{

        return index.saveObject({objectID: change.after.id, ...change.after.data()});

    }
   
});

exports.onAlgorithmDeleted = functions.firestore
    .document("algorithms/{algorithmId}")
    .onDelete(async (snap) => {

    const algoliasearch = (await import("algoliasearch")).default;
    const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
    const index = client.initIndex(ALGOLIA_INDEX_NAME);

    return index.deleteObject(snap.id);
   
});

let f1_init = false;

exports.aggregateVotes = functions.firestore
    .document("algorithms/{algorithmId}/votes/{voteId}")
    .onWrite(async (snap, context) => {

        const admin = await import("firebase-admin");

        if(!f1_init){
            admin.initializeApp();
            f1_init = true;
        }

        const algorithmdId = context.params.algorithmId;

        const parentRef = admin.firestore().collection("algorithms").doc(algorithmdId);
        const collectionRef = parentRef.collection("votes");

        return collectionRef.get().then(snap => {

            const votes = snap.docs.map(vote => vote.data().type);

            const score = votes.filter(vote => vote == "upvote").length - votes.filter(vote => vote == "downvote").length;

            parentRef.update({
                score: score
            })

        })
        
    })

let f2_init = false;

exports.aggregateComments = functions.firestore
    .document("algorithms/{algorithmId}/comments/{commentId}")
    .onWrite(async (snap, context) => {

        const admin = await import("firebase-admin");

        if(!f2_init){
            admin.initializeApp();
            f2_init = true;
        }


        const algorithmdId = context.params.algorithmId;

        const parentRef = admin.firestore().collection("algorithms").doc(algorithmdId);
        const collectionRef = parentRef.collection("comments");

        return collectionRef.get().then(snap => {

            const comments = snap.docs.length;

            parentRef.update({
                comments
            })

        })
        
    })

let f3_init = false;

exports.aggregateForks = functions.firestore
    .document("algorithms/{algorithmId}")
    .onWrite(async (snap, context) => {

        const admin = await import("firebase-admin");

        if(!f3_init){
            admin.initializeApp();
            f3_init = true;
        }

        const parentId = snap.before.data()?.fork_of || snap.after.data()?.fork_of;

        const forksRef = admin.firestore().collection("algorithms").where("fork_of", "==", parentId);
        
        return forksRef.get().then(snap => {

            const forks = snap.docs.length;

            const parentRef = admin.firestore().collection("algorithms").doc(parentId);

            parentRef.update({
                forks
            })

        });
        
    })

let f4_init = false;

exports.aggregateForks = functions.firestore
    .document("algorithms/{algorithmId}")
    .onDelete(async (snap, context) => {

        const admin = await import("firebase-admin");

        if(!f4_init){
            admin.initializeApp();
            f4_init = true;
        }

        const ref = admin.firestore().collection("algorithms").doc(context.params.algorithmId)
        
        return admin.firestore().recursiveDelete(ref);
        
    })




