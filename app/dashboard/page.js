// app/dashboard/page.js
'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If session is determined and not authenticated
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      setIsLoading(false);
    }
  }, [status, router]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  if (isLoading || status === "loading") {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 bg-light p-4" style={{ minHeight: '100vh' }}>
          <h4 className="text-center" style={{ color: '#6C63FF' }}>BeautyOrder Dashboard</h4>
          <ul className="nav flex-column mt-4">
            <li className="nav-item">
              <Link href="/dashboard" className="nav-link active" style={{ color: '#6C63FF' }}>Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link href="/manage-products" className="nav-link" style={{ color: '#6C63FF' }}>Kelola Produk</Link>
            </li>
            <li className="nav-item">
              <Link href="/manage-orders" className="nav-link" style={{ color: '#6C63FF' }}>Kelola Pesanan</Link>
            </li>
            <li className="nav-item">
              <Link href="/sales-report" className="nav-link" style={{ color: '#6C63FF' }}>Laporan Penjualan</Link>
            </li>
            <li className="nav-item">
              <Link href="/settings" className="nav-link" style={{ color: '#6C63FF' }}>Pengaturan</Link>
            </li>
            <li className="nav-item mt-5">
              <button 
                onClick={handleSignOut} 
                className="nav-link text-danger border-0 bg-transparent"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
        {/* Main Content */}
        <div className="col-md-9 col-lg-10 p-4">
          {/* Header with Search */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Welcome, {session?.user?.name || 'Admin'}</h2>
            <input
              type="text"
              placeholder="Search..."
              className="form-control w-25"
              style={{ borderRadius: '30px', boxShadow: '0px 0px 5px rgba(0,0,0,0.1)' }}
            />
          </div>
          {/* Banner Promo */}
          <div className="alert alert-info text-center" style={{ backgroundColor: '#F7F7F7', borderRadius: '15px' }}>
            <h4 style={{ color: '#6C63FF' }}>🎉 Promo Spesial: Diskon 20% untuk Semua Produk!</h4>
          </div>
          {/* Card Section for Stats */}
          <div className="row mt-4">
            {/* Total Produk */}
            <div className="col-sm-12 col-md-6 col-lg-3 mb-3">
              <div className="card shadow-lg" style={{ borderRadius: '15px', backgroundColor: '#F3F6FB' }}>
                <div className="card-body text-center">
                  <h5 className="card-title" style={{ color: '#6C63FF' }}>Total Produk</h5>
                  <p className="card-text" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>120 Produk</p>
                </div>
              </div>
            </div>
            {/* Total Pesanan */}
            <div className="col-sm-12 col-md-6 col-lg-3 mb-3">
              <div className="card shadow-lg" style={{ borderRadius: '15px', backgroundColor: '#F3F6FB' }}>
                <div className="card-body text-center">
                  <h5 className="card-title" style={{ color: '#6C63FF' }}>Total Pesanan</h5>
                  <p className="card-text" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>245 Pesanan</p>
                </div>
              </div>
            </div>
            {/* Pesanan Selesai */}
            <div className="col-sm-12 col-md-6 col-lg-3 mb-3">
              <div className="card shadow-lg" style={{ borderRadius: '15px', backgroundColor: '#F3F6FB' }}>
                <div className="card-body text-center">
                  <h5 className="card-title" style={{ color: '#6C63FF' }}>Pesanan Selesai</h5>
                  <p className="card-text" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>120 Selesai</p>
                </div>
              </div>
            </div>
            {/* Laporan Penjualan */}
            <div className="col-sm-12 col-md-6 col-lg-3 mb-3">
              <div className="card shadow-lg" style={{ borderRadius: '15px', backgroundColor: '#F3F6FB' }}>
                <div className="card-body text-center">
                  <h5 className="card-title" style={{ color: '#6C63FF' }}>Laporan Penjualan</h5>
                  <p className="card-text" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Rp 5.000.000</p>
                </div>
              </div>
            </div>
          </div>
          {/* Table: Daftar Pesanan */}
          <h3 className="mt-5">Daftar Pesanan Masuk</h3>
          <div className="table-responsive">
            <table className="table table-striped mt-3">
              <thead>
                <tr>
                  <th scope="col">ID Pesanan</th>
                  <th scope="col">Nama Pelanggan</th>
                  <th scope="col">Status</th>
                  <th scope="col">Tanggal Pesan</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#001</td>
                  <td>Maria</td>
                  <td><span className="badge bg-warning">Sedang Diproses</span></td>
                  <td>2025-05-14</td>
                  <td>
                    <button className="btn btn-primary btn-sm">Detail</button>
                  </td>
                </tr>
                <tr>
                  <td>#002</td>
                  <td>John</td>
                  <td><span className="badge bg-success">Selesai</span></td>
                  <td>2025-05-13</td>
                  <td>
                    <button className="btn btn-primary btn-sm">Detail</button>
                  </td>
                </tr>
                {/* Tambahkan baris pesanan lainnya */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}