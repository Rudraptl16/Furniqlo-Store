import React, { useState } from 'react';
import { Plus, Trash2, Edit3 } from 'lucide-react';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState([
    { id: 1, name: 'Aura Armchair', price: 200, category: 'Modern' },
    { id: 2, name: 'Tranquil Bedframe', price: 150, category: 'Wooden' }
  ]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') setIsAuthenticated(true);
    else alert('Incorrect password');
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const updatePrice = (id: number, newPrice: number) => {
    setProducts(products.map(p => p.id === id ? { ...p, price: newPrice } : p));
    setEditingId(null);
  };

  if (!isAuthenticated) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f4f4' }}>
        <form onSubmit={handleLogin} style={{ background: '#fff', padding: '3rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '2rem' }}>Admin Access</h2>
          <input 
            type="password" 
            placeholder="Enter Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '1rem', width: '100%', marginBottom: '1.5rem', borderRadius: '8px', border: '1px solid #ddd' }} 
          />
          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Login</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: '4rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Inventory Management</h1>
        <button className="btn-primary" style={{ background: '#1a1a1a' }}>
          <Plus size={20} style={{ marginRight: '0.5rem' }} /> Add New Product
        </button>
      </div>

      <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: '#ffffffff' }}>
            <tr>
              <th style={thStyle}>Product Name</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={tdStyle}>{product.name}</td>
                <td style={tdStyle}>{product.category}</td>
                <td style={tdStyle}>
                  {editingId === product.id ? (
                    <input 
                      type="number" 
                      defaultValue={product.price}
                      onBlur={(e) => updatePrice(product.id, Number(e.target.value))}
                      autoFocus
                      style={{ width: '80px', padding: '0.4rem' }}
                    />
                  ) : (
                    `$${product.price}`
                  )}
                </td>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={() => setEditingId(product.id)} style={{ color: '#666' }}><Edit3 size={18} /></button>
                    <button onClick={() => deleteProduct(product.id)} style={{ color: '#ff4d4d' }}><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const thStyle = { padding: '1.5rem', fontWeight: '600', color: '#888', fontSize: '0.9rem', textTransform: 'uppercase' as const };
const tdStyle = { padding: '1.5rem', fontWeight: '500' };

export default Admin;
