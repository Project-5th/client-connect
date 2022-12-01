const offer = await peerConnection.createOffer();
await peerConnection.setLocalDescription(offer);

const roomWithOffer = {
    offer: {
        type: offer.type,
        sdp: offer.sdp
    }
}
const roomRef = await db.collection('rooms').add(roomWithOffer);
const roomId = roomRef.id;

roomRef.onSnapshot(async snapshot => {
    console.log('Got updated room:', snapshot.data());
    const data = snapshot.data();
    if (!peerConnection.currentRemoteDescription && data.answer) {
        console.log('Set remote description: ', data.answer);
        const answer = new RTCSessionDescription(data.answer)
        await peerConnection.setRemoteDescription(answer);
    }
});

// const offer = roomSnapshot.data().offer;
await peerConnection.setRemoteDescription(offer);
const answer = await peerConnection.createAnswer();
await peerConnection.setLocalDescription(answer);

const roomWithAnswer = {
    answer: {
        type: answer.type,
        sdp: answer.sdp
    }
}
await roomRef.update(roomWithAnswer);

async function collectIceCandidates(roomRef, peerConnection,
    localName, remoteName) {
    const candidatesCollection = roomRef.collection(localName);

    peerConnection.addEventListener('icecandidate', event => {
        if (event.candidate) {
            const json = event.candidate.toJSON();
            candidatesCollection.add(json);
        }
    });

    roomRef.collection(remoteName).onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
            if (change.type === "added") {
                const candidate = new RTCIceCandidate(change.doc.data());
                peerConneciton.addIceCandidate(candidate);
            }
        });
    })
}