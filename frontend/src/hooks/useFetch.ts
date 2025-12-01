import { useState, useEffect } from 'react';

export function useFetch<T = any>(url:string, options?:RequestInit){
  const [data,setData]=useState<T|null>(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState<Error|null>(null);
  useEffect(()=>{
    let mounted=true;
    setLoading(true); setError(null);
    fetch(url, options).then(async r=>{ if(!mounted) return; if(!r.ok) throw new Error('HTTP '+r.status); const j=await r.json(); setData(j); }).catch(e=>{ if(!mounted) return; setError(e as Error)}).finally(()=>{ if(mounted) setLoading(false)});
    return ()=>{ mounted=false };
  },[url, JSON.stringify(options||{})]);
  return { data, loading, error } as const;
}
