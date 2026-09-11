import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, doc, updateDoc, deleteDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Use the configured database ID
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || undefined);

export interface ProjectInquiry {
  id?: string;
  brandName: string;
  contactPerson: string;
  email: string;
  phone?: string;
  selectedPackage: string;
  selectedAddons: string[];
  targetMarkets: string[];
  category: string;
  instagramHandle?: string;
  websiteUrl?: string;
  monthlyBudget: string;
  message?: string;
  status: 'new' | 'reviewing' | 'consultation_scheduled' | 'proposal_sent' | 'contracted';
  userId?: string;
  userEmail?: string;
  estimatedCost?: number;
  createdAt?: any;
}

export async function submitInquiry(data: Omit<ProjectInquiry, 'status' | 'createdAt'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, "inquiries"), {
      ...data,
      status: 'new',
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error submitting inquiry to Firestore:", error);
    throw error;
  }
}

export async function fetchUserInquiries(userId: string, userEmail?: string): Promise<ProjectInquiry[]> {
  try {
    const inquiriesRef = collection(db, "inquiries");
    let q = query(inquiriesRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    const results: ProjectInquiry[] = [];
    snapshot.forEach(doc => {
      results.push({ id: doc.id, ...doc.data() } as ProjectInquiry);
    });
    return results.sort((a, b) => {
      const timeA = a.createdAt?.seconds || 0;
      const timeB = b.createdAt?.seconds || 0;
      return timeB - timeA;
    });
  } catch (error) {
    console.warn("Could not fetch user inquiries from Firestore:", error);
    return [];
  }
}
