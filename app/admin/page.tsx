import { checkIsAdmin } from '@/lib/admin';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import React from 'react'

const AdminPanel = dynamic(() => import('./AdminPanel'), { ssr: false });


function AdminPage() {
  const isAdmin = checkIsAdmin();
  
  if (!isAdmin) {
    redirect('/');
  }

  return (
    <AdminPanel />
  )
}

export default AdminPage;