import React, { useEffect, useState, useRef } from 'react';
import {
  Image as ImageIcon,
  Plus,
  Upload,
  Link as LinkIcon,
  Trash2,
  CheckCircle,
  AlertCircle,
  Eye,
  X,
} from 'lucide-react';
import api from '../../services/api';

export default function ManageGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [uploadMode, setUploadMode] = useState('FILE'); // 'FILE' or 'URL'

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Darshan');
  const [description, setDescription] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isPublished, setIsPublished] = useState(true);

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fileInputRef = useRef(null);

  const loadGallery = () => {
    setLoading(true);
    api
      .get('/gallery/admin/all')
      .then((res) => {
        if (res.success) setItems(res.data || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      if (!title) {
        // Auto-generate title from filename
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
      }
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setFileUrl(url);
    setPreviewUrl(url);
  };

  const resetForm = () => {
    setTitle('');
    setCategory('Darshan');
    setDescription('');
    setFileUrl('');
    setSelectedFile(null);
    setPreviewUrl('');
    setIsPublished(true);
    setErrorMessage('');
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    try {
      if (uploadMode === 'FILE') {
        if (!selectedFile) {
          throw new Error('Please select an image file to upload.');
        }

        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('title', title);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('isPublished', isPublished);

        const res = await api.post('/gallery/admin', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (res.success) {
          setSuccessMessage('Image uploaded and added to gallery successfully!');
          resetForm();
          loadGallery();
          setTimeout(() => setSuccessMessage(''), 4000);
        }
      } else {
        // URL Mode
        if (!fileUrl) {
          throw new Error('Please enter a valid image URL.');
        }

        const payload = {
          title,
          category,
          description,
          fileUrl,
          isPublished,
        };

        const res = await api.post('/gallery/admin', payload);
        if (res.success) {
          setSuccessMessage('Gallery image added successfully!');
          resetForm();
          loadGallery();
          setTimeout(() => setSuccessMessage(''), 4000);
        }
      }
    } catch (err) {
      setErrorMessage(err.message || 'Failed to add image to gallery.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, itemTitle) => {
    if (!window.confirm(`Are you sure you want to remove "${itemTitle}" from the gallery?`)) {
      return;
    }

    try {
      await api.delete(`/gallery/admin/${id}`);
      setSuccessMessage('Image removed from gallery.');
      loadGallery();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      alert(err.message || 'Failed to remove image.');
    }
  };

  return (
    <div>
      {/* Header with Title and Add Image Button */}
      <div className="admin-page-header">
        <div>
          <h1>Manage Media & Gallery</h1>
          <p>
            Catalog and upload photographs of Swami Ji, sacred palm leaves, ashram events, and world tours.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="btn btn-primary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
        >
          <Plus size={18} />
          <span>Add Image to Gallery</span>
        </button>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div
          style={{
            padding: '0.85rem 1rem',
            background: 'var(--color-success-bg)',
            color: 'var(--color-success)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--space-4)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontWeight: 500,
          }}
        >
          <CheckCircle size={18} />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Gallery Table */}
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: 90 }}>Preview</th>
              <th>Title & Caption</th>
              <th>Category</th>
              <th>Media Source / URL</th>
              <th>Visibility</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
                  Loading gallery archives...
                </td>
              </tr>
            ) : items.length > 0 ? (
              items.map((i) => {
                const imgUrl = i.media?.fileUrl;
                return (
                  <tr key={i.id}>
                    <td>
                      <div
                        style={{
                          width: 68,
                          height: 52,
                          borderRadius: 'var(--radius-sm)',
                          overflow: 'hidden',
                          background: 'var(--color-surface)',
                          border: '1px solid var(--color-border)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {imgUrl ? (
                          <img
                            src={imgUrl}
                            alt={i.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <ImageIcon size={20} color="var(--color-text-muted)" />
                        )}
                      </div>
                    </td>
                    <td>
                      <strong>{i.title}</strong>
                      {i.description && (
                        <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                          {i.description}
                        </p>
                      )}
                    </td>
                    <td>
                      <span className="badge badge-info">{i.category}</span>
                    </td>
                    <td style={{ maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {imgUrl ? (
                        <a
                          href={imgUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: 'var(--color-secondary-dark)', textDecoration: 'underline', fontSize: '0.85rem' }}
                        >
                          {imgUrl}
                        </a>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td>
                      <span className={`badge ${i.isPublished ? 'badge-success' : 'badge-warning'}`}>
                        {i.isPublished ? 'Public' : 'Hidden'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        type="button"
                        onClick={() => handleDelete(i.id, i.title)}
                        className="btn btn-text btn-sm"
                        style={{ color: 'var(--color-danger)' }}
                        title="Delete image"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '3rem' }}>
                  <ImageIcon size={40} color="var(--color-secondary)" style={{ margin: '0 auto 1rem auto' }} />
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                    No media items uploaded yet
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    Upload photographs of Swami Ji, palm leaf manuscripts, and sacred tour moments.
                  </p>
                  <button type="button" onClick={() => setShowModal(true)} className="btn btn-primary btn-sm">
                    <Plus size={16} />
                    <span>Upload Your First Image</span>
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Upload Image Modal */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem',
          }}
        >
          <div
            style={{
              background: 'var(--color-white)',
              borderRadius: 'var(--radius-lg)',
              width: '100%',
              maxWidth: 600,
              padding: 'var(--space-8)',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 16px 40px rgba(0,0,0,0.2)',
              position: 'relative',
            }}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={resetForm}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                color: 'var(--color-text-muted)',
              }}
            >
              <X size={20} />
            </button>

            <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary)', marginBottom: 4 }}>
              Add Image to Sacred Gallery
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-6)' }}>
              Upload an image file directly from your device or specify an image URL.
            </p>

            {errorMessage && (
              <div
                style={{
                  padding: '0.75rem',
                  background: 'var(--color-danger-bg)',
                  color: 'var(--color-danger)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: 'var(--space-4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: '0.85rem',
                }}
              >
                <AlertCircle size={18} />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Mode Switcher */}
            <div
              style={{
                display: 'flex',
                gap: 'var(--space-3)',
                marginBottom: 'var(--space-6)',
                borderBottom: '1px solid var(--color-border)',
                paddingBottom: 'var(--space-2)',
              }}
            >
              <button
                type="button"
                onClick={() => setUploadMode('FILE')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  color: uploadMode === 'FILE' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                  borderBottom: uploadMode === 'FILE' ? '2px solid var(--color-primary)' : 'none',
                  paddingBottom: 6,
                }}
              >
                <Upload size={16} />
                <span>Upload From Device</span>
              </button>
              <button
                type="button"
                onClick={() => setUploadMode('URL')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  color: uploadMode === 'URL' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                  borderBottom: uploadMode === 'URL' ? '2px solid var(--color-primary)' : 'none',
                  paddingBottom: 6,
                }}
              >
                <LinkIcon size={16} />
                <span>Image URL</span>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* File Dropzone / Picker */}
              {uploadMode === 'FILE' ? (
                <div className="form-group">
                  <label className="form-label">Select Image File *</label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      border: '2px dashed var(--color-secondary)',
                      borderRadius: 'var(--radius-md)',
                      padding: 'var(--space-6)',
                      textAlign: 'center',
                      background: 'var(--color-surface)',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease',
                    }}
                  >
                    <Upload size={32} color="var(--color-primary)" style={{ margin: '0 auto var(--space-2) auto' }} />
                    <p style={{ margin: 0, fontWeight: 600, color: 'var(--color-primary)' }}>
                      {selectedFile ? selectedFile.name : 'Click to Browse Image from Computer'}
                    </p>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      Supports PNG, JPG, JPEG, WEBP up to 10MB
                    </span>
                  </div>
                </div>
              ) : (
                <div className="form-group">
                  <label className="form-label">Image URL *</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://example.com/photo.jpg or /images/swamiji.jpg"
                    value={fileUrl}
                    onChange={handleUrlChange}
                    required
                  />
                </div>
              )}

              {/* Live Preview Box */}
              {previewUrl && (
                <div style={{ marginBottom: 'var(--space-5)', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: 4 }}>
                    Live Image Preview:
                  </span>
                  <div
                    style={{
                      maxHeight: 220,
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      display: 'inline-block',
                      border: '1px solid var(--color-border)',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    <img
                      src={previewUrl}
                      alt="Preview"
                      style={{ maxHeight: 220, maxWidth: '100%', objectFit: 'contain' }}
                      onError={() => {
                        setErrorMessage('Unable to load image from the provided URL.');
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Title */}
              <div className="form-group">
                <label className="form-label">Image Title *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Swami Ji in Darshan, Palm Leaf Bundle #108"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Category */}
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Darshan">Darshan</option>
                    <option value="Nadi Palm Leaves">Nadi Palm Leaves</option>
                    <option value="Travel Tours">Travel Tours</option>
                    <option value="Events & Pujas">Events & Pujas</option>
                    <option value="Ashram Life">Ashram Life</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Visibility</label>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      height: '100%',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isPublished}
                      onChange={(e) => setIsPublished(e.target.checked)}
                    />
                    <span>Publish to public website</span>
                  </label>
                </div>
              </div>

              {/* Description */}
              <div className="form-group">
                <label className="form-label">Description / Caption (Optional)</label>
                <textarea
                  className="form-textarea"
                  style={{ minHeight: 80 }}
                  placeholder="Provide context or description for this photograph..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: 'var(--space-6)' }}>
                <button type="button" onClick={resetForm} className="btn btn-outline" disabled={submitting}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  <Upload size={16} />
                  <span>{submitting ? 'Saving Image...' : 'Save to Gallery'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
