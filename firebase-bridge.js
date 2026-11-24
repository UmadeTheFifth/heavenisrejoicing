import {enabled,firebaseConfig} from './firebase-config.js';
if(enabled){
 try{
  const base='https://www.gstatic.com/firebasejs/11.10.0/';
  const [app,auth,fs,st]=await Promise.all(['firebase-app.js','firebase-auth.js','firebase-firestore.js','firebase-storage.js'].map(x=>import(base+x)));
  const instance=app.initializeApp(firebaseConfig), a=auth.getAuth(instance), db=fs.getFirestore(instance), storage=st.getStorage(instance);
  const publicKeys=['messages','gallery','events'];
  const store={mode:'cloud',isAdmin:false,
   async get(key){if(key==='settings'){const s=await fs.getDoc(fs.doc(db,'settings','site'));return s.data()||{}}if(![...publicKeys,'inbox'].includes(key))throw Error('Unknown collection');const s=await fs.getDocs(fs.collection(db,key));return s.docs.map(d=>({...d.data(),id:d.id})).sort((a,b)=>(b.created||'').localeCompare(a.created||''))},
   async set(key,value){if(key!=='settings')throw Error('Invalid operation');await fs.setDoc(fs.doc(db,'settings','site'),value)},
   async add(key,item){await fs.setDoc(fs.doc(db,key,item.id),{...item,created:new Date().toISOString()})},
   async remove(key,id){await fs.deleteDoc(fs.doc(db,key,id))},
   async upload(file,folder){const path=`${folder}/${crypto.randomUUID()}-${file.name.replace(/[^\w.\-]/g,'_')}`;const r=st.ref(storage,path);await st.uploadBytes(r,file,{contentType:file.type,contentDisposition:folder==='messages'&&['application/pdf','text/plain'].includes(file.type)?'attachment':'inline'});return st.getDownloadURL(r)},
   async submit(item){await fs.setDoc(fs.doc(db,'inbox',item.id),item)},
   async signIn(email,password){await auth.signInWithEmailAndPassword(a,email,password);},async signOut(){await auth.signOut(a)}
  };
  window.churchStore=store;window.dispatchEvent(new Event('church-store-ready'));
  auth.onAuthStateChanged(a,async user=>{store.isAdmin=false;if(user){try{store.isAdmin=(await fs.getDoc(fs.doc(db,'admins',user.uid))).exists()}catch(e){console.error(e)}}window.dispatchEvent(new Event('church-store-ready'));if(user&&!store.isAdmin&&document.getElementById('status'))document.getElementById('status').textContent='This account is not approved as a church administrator.'});
 }catch(e){console.error(e);const n=document.getElementById('mode')||document.getElementById('contact-status');if(n)n.textContent='Firebase connection failed. Check configuration. Local demo only.'}
}
