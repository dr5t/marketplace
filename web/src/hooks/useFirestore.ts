"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";

export const useFirestore = (collectionName: string) => {
  const [data, setData] = useState<any[]>([]);
  const [lastUpdate, setLastUpdate] = useState<any>(null);

  useEffect(() => {
    const q = query(collection(db, collectionName), orderBy("createdAt", "desc"), limit(5));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: any[] = [];
      snapshot.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
      
      setData(prev => {
        const prevId = prev.length > 0 ? prev[0].id : null;
        const newId = items.length > 0 ? items[0].id : null;
        
        if (newId && newId !== prevId && !snapshot.metadata.hasPendingWrites) {
          setLastUpdate(items[0]);
        }
        return items;
      });
    });

    return () => unsubscribe();
  }, [collectionName]);

  return { data, lastUpdate };
};
