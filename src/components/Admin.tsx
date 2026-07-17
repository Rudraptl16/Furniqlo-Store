import React, { useState } from 'react';
import { Plus, Trash2, Edit3 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Admin: React.FC = () => {
  const { addToast } = useCart();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState([
    { id: 1, name: 'Aura Armchair', price: 200, category: 'Modern' },
    { id: 2, name: 'Tranquil Bedframe', price: 150, category: 'Wooden' }
  ]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      addToast('Welcome back, Administrator', 'success');
    } else {
      addToast('Incorrect password entered', 'error');
    }
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    addToast('Product removed from inventory', 'info');
  };

  const updatePrice = (id: number, newPrice: number) => {
    setProducts(products.map(p => p.id === id ? { ...p, price: newPrice } : p));
    setEditingId(null);
    addToast('Product price updated', 'success');
  };

  if (!isAuthenticated) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-tri)' }}>
        <form onSubmit={handleLogin} style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)', padding: '3rem', borderRadius: '24px', boxShadow: 'var(--shadow-premium)', textAlign: 'center', maxWidth: '400px', width: '90%' }}>
          <h2 style={{ marginBottom: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)' }}>Admin Access</h2>
          <input 
            type="password" 
            placeholder="Enter Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '1rem', width: '100%', marginBottom: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-sec)', color: 'var(--text-main)', outline: 'none' }} 
          />
          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', cursor: 'pointer' }}>Login</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto', minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-main)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)' }}>Inventory Management</h1>
        <button className="btn-primary" style={{ background: 'var(--primary)', color: 'var(--bg-main)' }}>
          <Plus size={20} style={{ marginRight: '0.5rem' }} /> Add New Product
        </button>
      </div>

      <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-glass)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: 'var(--bg-tri)' }}>
            <tr>
              <th style={{ ...thStyle, borderBottom: '1px solid var(--border-color)' }}>Product Name</th>
              <th style={{ ...thStyle, borderBottom: '1px solid var(--border-color)' }}>Category</th>
              <th style={{ ...thStyle, borderBottom: '1px solid var(--border-color)' }}>Price</th>
              <th style={{ ...thStyle, borderBottom: '1px solid var(--border-color)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={tdStyle}>{product.name}</td>
                <td style={tdStyle}>{product.category}</td>
                <td style={tdStyle}>
                  {editingId === product.id ? (
                    <input 
                      type="number" 
                      defaultValue={product.price}
                      onBlur={(e) => updatePrice(product.id, Number(e.target.value))}
                      autoFocus
                      style={{ width: '80px', padding: '0.4rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-sec)', color: 'var(--text-main)', outline: 'none' }}
                    />
                  ) : (
                    `$${product.price}`
                  )}
                </td>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', gap: '1.2rem' }}>
                    <button onClick={() => setEditingId(product.id)} style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }} aria-label="Edit Price"><Edit3 size={18} /></button>
                    <button onClick={() => deleteProduct(product.id)} style={{ color: '#ff4d4d', background: 'none', border: 'none', cursor: 'pointer' }} aria-label="Delete Product"><Trash2 size={18} /></button>
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

const thStyle = { padding: '1.5rem', fontWeight: '600', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' as const };
const tdStyle = { padding: '1.5rem', fontWeight: '500' };

export default Admin;
