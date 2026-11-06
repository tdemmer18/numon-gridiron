// Cloud sync with Firebase: a parent signs in once (email + password) and progress saves to
// families/{parentUid}/kids/main. Nothing here runs until firebase-config.js has a config.
const cfg = window.FIREBASE_CONFIG;
if (!cfg) {
  window.FB = null;
  dispatchEvent(new Event('fb-ready'));
} else {
  const V = '10.12.2';
  const [{ initializeApp }, A, F] = await Promise.all([
    import(`https://www.gstatic.com/firebasejs/${V}/firebase-app.js`),
    import(`https://www.gstatic.com/firebasejs/${V}/firebase-auth.js`),
    import(`https://www.gstatic.com/firebasejs/${V}/firebase-firestore.js`)
  ]);
  const app = initializeApp(cfg);
  const auth = A.getAuth(app);
  const db = F.getFirestore(app);
  const progressDoc = uid => F.doc(db, 'families', uid, 'kids', 'main');
  window.FB = {
    onUser: cb => A.onAuthStateChanged(auth, cb),
    signIn: (e, p) => A.signInWithEmailAndPassword(auth, e, p),
    signUp: (e, p) => A.createUserWithEmailAndPassword(auth, e, p),
    reset: e => A.sendPasswordResetEmail(auth, e),
    signOut: () => A.signOut(auth),
    // Stored as one JSON string: Firestore does not allow arrays inside arrays, which the saved questions use.
    progressRef: uid => ({
      get: async () => { const s = await F.getDoc(progressDoc(uid)); const d = s.exists() ? s.data() : null;
        return { exists: !!(d && d.json), data: () => ({ state: JSON.parse(d.json), updatedAt: d.updatedAt }) }; },
      set: o => F.setDoc(progressDoc(uid), { json: JSON.stringify(o.state), updatedAt: o.updatedAt, savedAt: F.serverTimestamp() }),
      watch: (next, err) => F.onSnapshot(progressDoc(uid), s => { const d = s.exists() ? s.data() : null;
        next(d && d.json ? { state: JSON.parse(d.json), updatedAt: d.updatedAt } : null); }, err)
    })
  };
  dispatchEvent(new Event('fb-ready'));
}
