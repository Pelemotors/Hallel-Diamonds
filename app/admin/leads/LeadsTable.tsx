'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  source: string;
  status: string;
  created_at: string;
  page_path: string | null;
}

interface LeadsTableProps {
  initialLeads: Lead[];
}

interface CustomDesignSubmission {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  answers: {
    jewelryType?: string;
    style?: string;
    metal?: string;
    diamondType?: string;
    diamondShape?: string;
    budget?: string;
    deadline?: string;
  };
  created_at: string;
}

const JEWELRY_TYPES: Record<string, string> = {
  'ring': 'טבעת',
  'necklace': 'שרשרת',
  'earrings': 'עגילים',
  'bracelet': 'צמיד',
};

const STYLES: Record<string, string> = {
  'classic': 'קלאסי',
  'modern': 'מודרני',
  'vintage': 'וינטג\'',
  'minimalist': 'מינימליסטי',
};

const METALS: Record<string, string> = {
  'gold-yellow-14k': 'זהב צהוב 14K',
  'gold-yellow-18k': 'זהב צהוב 18K',
  'gold-white-14k': 'זהב לבן 14K',
  'gold-white-18k': 'זהב לבן 18K',
  'gold-rose-14k': 'זהב אדום 14K',
  'gold-rose-18k': 'זהב אדום 18K',
};

const DIAMOND_TYPES: Record<string, string> = {
  'natural': 'יהלום טבעי',
  'lab': 'יהלום מעבדה',
};

const DIAMOND_SHAPES: Record<string, string> = {
  'round': 'עגול',
  'princess': 'נסיכה',
  'emerald': 'אמרלד',
  'oval': 'אובלי',
  'pear': 'טיפה',
  'marquise': 'מרקיז',
};

const BUDGETS: Record<string, string> = {
  '5000-10000': '₪5,000 - ₪10,000',
  '10000-20000': '₪10,000 - ₪20,000',
  '20000-50000': '₪20,000 - ₪50,000',
  '50000+': '₪50,000+',
};

export function LeadsTable({ initialLeads }: LeadsTableProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editingLead, setEditingLead] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Lead>>({});
  const [submission, setSubmission] = useState<CustomDesignSubmission | null>(null);
  const [loadingSubmission, setLoadingSubmission] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load leads from API on mount and auto-refresh every 10 seconds
  useEffect(() => {
    const loadLeads = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/admin/leads');
        if (response.ok) {
          const data = await response.json();
          setLeads(data.leads || []);
        } else {
          console.error('Failed to load leads:', response.status);
          // Fallback to initialLeads if API fails
          if (initialLeads && initialLeads.length > 0) {
            setLeads(initialLeads);
          }
        }
      } catch (error) {
        console.error('Error loading leads:', error);
        // Fallback to initialLeads if API fails
        if (initialLeads && initialLeads.length > 0) {
          setLeads(initialLeads);
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Load leads on mount immediately
    loadLeads();

    // Auto-refresh every 10 seconds
    const interval = setInterval(() => {
      loadLeads();
    }, 10000); // 10 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [initialLeads]);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'new':
        return 'info';
      case 'in_progress':
        return 'default';
      case 'waiting_for_client':
        return 'warning';
      case 'closed':
        return 'success';
      case 'not_relevant':
        return 'warning';
      case 'contacted':
        return 'default';
      case 'converted':
        return 'success';
      case 'archived':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new':
        return 'חדש';
      case 'contacted':
        return 'נוצר קשר';
      case 'converted':
        return 'הומר';
      case 'archived':
        return 'בארכיון';
      default:
        return status;
    }
  };

  const handleView = (lead: Lead) => {
    setSelectedLead(lead);
    setSubmission(null);
    // אם זה ליד מעיצוב אישי, טען את ההגשה
    if (lead.source === 'custom-design') {
      loadSubmission(lead.phone, lead.name);
    }
  };

  const loadSubmission = async (phone: string, name: string) => {
    setLoadingSubmission(true);
    try {
      // טען ישירות מ-Supabase דרך API פנימי או ישירות
      const response = await fetch(`/api/admin/leads/submission?phone=${encodeURIComponent(phone)}&name=${encodeURIComponent(name)}`);
      if (response.ok) {
        const data = await response.json();
        if (data.submission) {
          setSubmission(data.submission);
        }
      }
    } catch (error) {
      console.error('Error loading submission:', error);
    } finally {
      setLoadingSubmission(false);
    }
  };

  const getAnswerLabel = (key: string, value: string): string => {
    switch (key) {
      case 'jewelryType':
        return JEWELRY_TYPES[value] || value;
      case 'style':
        return STYLES[value] || value;
      case 'metal':
        return METALS[value] || value;
      case 'diamondType':
        return DIAMOND_TYPES[value] || value;
      case 'diamondShape':
        return DIAMOND_SHAPES[value] || value;
      case 'budget':
        return BUDGETS[value] || value;
      default:
        return value;
    }
  };

  const handleEdit = (lead: Lead) => {
    setEditingLead(lead.id);
    setEditData({
      name: lead.name,
      phone: lead.phone,
      email: lead.email || '',
      message: lead.message || '',
      status: lead.status,
    });
  };

  const refreshLeads = async () => {
    try {
      const response = await fetch('/api/admin/leads');
      if (response.ok) {
        const data = await response.json();
        setLeads(data.leads || []);
      }
    } catch (error) {
      console.error('Error refreshing leads:', error);
    }
  };

  const handleSave = async (leadId: string) => {
    try {
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        const { lead } = await response.json();
        setLeads(leads.map(l => l.id === leadId ? lead : l));
        setEditingLead(null);
        setEditData({});
        // Refresh to get latest data
        await refreshLeads();
      } else {
        const data = await response.json();
        alert(data.error || 'שגיאה בעדכון הליד');
      }
    } catch (error) {
      console.error('Error updating lead:', error);
      alert('שגיאה כללית. נסי שוב מאוחר יותר.');
    }
  };

  const handleCancel = () => {
    setEditingLead(null);
    setEditData({});
  };

  const handleDelete = async (leadId: string) => {
    if (!confirm('האם את בטוחה שברצונך למחוק את הליד הזה?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setLeads(leads.filter(l => l.id !== leadId));
        if (selectedLead?.id === leadId) {
          setSelectedLead(null);
        }
        // Refresh to get latest data
        await refreshLeads();
      } else {
        const data = await response.json();
        alert(data.error || 'שגיאה במחיקת הליד');
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
      alert('שגיאה כללית. נסי שוב מאוחר יותר.');
    }
  };

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const { lead } = await response.json();
        setLeads(leads.map(l => l.id === leadId ? lead : l));
      } else {
        const data = await response.json();
        alert(data.error || 'שגיאה בעדכון הסטטוס');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('שגיאה כללית. נסי שוב מאוחר יותר.');
    }
  };

  if (isLoading && leads.length === 0) {
    return (
      <Card className="text-center py-12">
        <p className="text-text-dark/60 font-body">טוען לידים...</p>
      </Card>
    );
  }

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-text-dark/60 font-body">
          הרשימה מתעדכנת אוטומטית כל 10 שניות
        </p>
        <Button variant="secondary" size="sm" onClick={refreshLeads} disabled={isLoading}>
          {isLoading ? 'טוען...' : 'רענון רשימה'}
        </Button>
      </div>
      {leads.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-text-dark/60 font-body mb-4">
            אין לידים להצגה
          </p>
        </Card>
      ) : (
        <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-accent-sky/20">
                <th className="text-right py-4 px-4 font-heading font-semibold text-text-dark">
                  שם
                </th>
                <th className="text-right py-4 px-4 font-heading font-semibold text-text-dark">
                  טלפון
                </th>
                <th className="text-right py-4 px-4 font-heading font-semibold text-text-dark">
                  אימייל
                </th>
                <th className="text-right py-4 px-4 font-heading font-semibold text-text-dark">
                  מקור
                </th>
                <th className="text-right py-4 px-4 font-heading font-semibold text-text-dark">
                  תאריך
                </th>
                <th className="text-right py-4 px-4 font-heading font-semibold text-text-dark">
                  סטטוס
                </th>
                <th className="text-right py-4 px-4 font-heading font-semibold text-text-dark">
                  פעולות
                </th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-accent-sky/10 hover:bg-accent-sky/5">
                  {editingLead === lead.id ? (
                    <>
                      <td className="py-4 px-4">
                        <input
                          type="text"
                          value={editData.name || ''}
                          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                          className="w-full px-2 py-1 border border-accent-sky rounded"
                        />
                      </td>
                      <td className="py-4 px-4">
                        <input
                          type="text"
                          value={editData.phone || ''}
                          onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                          className="w-full px-2 py-1 border border-accent-sky rounded"
                        />
                      </td>
                      <td className="py-4 px-4">
                        <input
                          type="email"
                          value={editData.email || ''}
                          onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                          className="w-full px-2 py-1 border border-accent-sky rounded"
                        />
                      </td>
                      <td className="py-4 px-4 font-body text-text-dark">
                        {lead.source === 'custom-design' ? (
                          <span className="text-accent-sky">עיצוב אישי</span>
                        ) : lead.source === 'contact' ? (
                          <span>טופס יצירת קשר</span>
                        ) : (
                          <span>{lead.source}</span>
                        )}
                      </td>
                      <td className="py-4 px-4 font-body text-text-dark">
                        {new Date(lead.created_at).toLocaleDateString('he-IL')}
                      </td>
                      <td className="py-4 px-4">
                        <select
                          value={editData.status || lead.status}
                          onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                          className="px-2 py-1 border border-accent-sky rounded"
                        >
                          <option value="new">חדש</option>
                          <option value="contacted">נוצר קשר</option>
                          <option value="converted">הומר</option>
                          <option value="archived">בארכיון</option>
                        </select>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSave(lead.id)}
                            className="text-green-600 hover:text-green-700 font-body text-sm"
                          >
                            שמור
                          </button>
                          <button
                            onClick={handleCancel}
                            className="text-gray-600 hover:text-gray-700 font-body text-sm"
                          >
                            ביטול
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-4 px-4 font-body text-text-dark">{lead.name}</td>
                      <td className="py-4 px-4 font-body text-text-dark">{lead.phone}</td>
                      <td className="py-4 px-4 font-body text-text-dark">{lead.email || '-'}</td>
                      <td className="py-4 px-4 font-body text-text-dark">
                        {lead.source === 'custom-design' ? (
                          <span className="text-accent-sky">עיצוב אישי</span>
                        ) : lead.source === 'contact' ? (
                          <span>טופס יצירת קשר</span>
                        ) : (
                          <span>{lead.source}</span>
                        )}
                      </td>
                      <td className="py-4 px-4 font-body text-text-dark">
                        {new Date(lead.created_at).toLocaleDateString('he-IL')}
                      </td>
                      <td className="py-4 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className="px-2 py-1 border border-accent-sky rounded text-sm"
                        >
                          <option value="new">חדש</option>
                          <option value="contacted">נוצר קשר</option>
                          <option value="converted">הומר</option>
                          <option value="archived">בארכיון</option>
                        </select>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleView(lead)}
                            className="text-accent-sky hover:text-accent-lavender font-body text-sm"
                          >
                            צפייה
                          </button>
                          <button
                            onClick={() => handleEdit(lead)}
                            className="text-blue-600 hover:text-blue-700 font-body text-sm"
                          >
                            עריכה
                          </button>
                          <button
                            onClick={() => handleDelete(lead.id)}
                            className="text-red-500 hover:text-red-700 font-body text-sm"
                          >
                            מחק
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </Card>
      )}

      {/* View Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-heading font-bold text-text-dark">
                פרטי ליד
              </h2>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-text-dark/60 hover:text-text-dark text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="font-heading font-semibold text-text-dark block mb-2">
                  שם מלא:
                </label>
                <p className="font-body text-text-dark/80">{selectedLead.name}</p>
              </div>

              <div>
                <label className="font-heading font-semibold text-text-dark block mb-2">
                  טלפון:
                </label>
                <p className="font-body text-text-dark/80">
                  <a href={`tel:${selectedLead.phone}`} className="text-accent-sky hover:underline">
                    {selectedLead.phone}
                  </a>
                </p>
              </div>

              {selectedLead.email && (
                <div>
                  <label className="font-heading font-semibold text-text-dark block mb-2">
                    אימייל:
                  </label>
                  <p className="font-body text-text-dark/80">
                    <a href={`mailto:${selectedLead.email}`} className="text-accent-sky hover:underline">
                      {selectedLead.email}
                    </a>
                  </p>
                </div>
              )}

              {selectedLead.message && (
                <div>
                  <label className="font-heading font-semibold text-text-dark block mb-2">
                    הודעה:
                  </label>
                  <p className="font-body text-text-dark/80 whitespace-pre-wrap">
                    {selectedLead.message}
                  </p>
                </div>
              )}

              <div>
                <label className="font-heading font-semibold text-text-dark block mb-2">
                  מקור:
                </label>
                <p className="font-body text-text-dark/80">
                  {selectedLead.source === 'custom-design' ? 'עיצוב אישי' : selectedLead.source === 'contact' ? 'טופס יצירת קשר' : selectedLead.source}
                </p>
              </div>

              <div>
                <label className="font-heading font-semibold text-text-dark block mb-2">
                  סטטוס:
                </label>
                <Badge variant={getStatusBadgeVariant(selectedLead.status)}>
                  {getStatusLabel(selectedLead.status)}
                </Badge>
              </div>

              <div>
                <label className="font-heading font-semibold text-text-dark block mb-2">
                  תאריך יצירה:
                </label>
                <p className="font-body text-text-dark/80">
                  {new Date(selectedLead.created_at).toLocaleString('he-IL')}
                </p>
              </div>

              {/* Custom Design Submission Section */}
              {selectedLead.source === 'custom-design' && (
                <div className="mt-6 pt-6 border-t border-accent-sky/20">
                  <label className="font-heading font-semibold text-text-dark block mb-4">
                    תשובות שאלון העיצוב האישי:
                  </label>
                  
                  {loadingSubmission ? (
                    <p className="text-text-dark/60 font-body text-sm">טוען תשובות...</p>
                  ) : submission ? (
                    <div className="space-y-3">
                      {submission.answers.jewelryType && (
                        <div className="bg-accent-sky/10 p-3 rounded-lg">
                          <strong className="font-heading">סוג תכשיט:</strong>{' '}
                          <span className="font-body">{getAnswerLabel('jewelryType', submission.answers.jewelryType)}</span>
                        </div>
                      )}
                      {submission.answers.style && (
                        <div className="bg-accent-sky/10 p-3 rounded-lg">
                          <strong className="font-heading">סגנון:</strong>{' '}
                          <span className="font-body">{getAnswerLabel('style', submission.answers.style)}</span>
                        </div>
                      )}
                      {submission.answers.metal && (
                        <div className="bg-accent-sky/10 p-3 rounded-lg">
                          <strong className="font-heading">מתכת:</strong>{' '}
                          <span className="font-body">{getAnswerLabel('metal', submission.answers.metal)}</span>
                        </div>
                      )}
                      {submission.answers.diamondType && (
                        <div className="bg-accent-sky/10 p-3 rounded-lg">
                          <strong className="font-heading">סוג יהלום:</strong>{' '}
                          <span className="font-body">{getAnswerLabel('diamondType', submission.answers.diamondType)}</span>
                        </div>
                      )}
                      {submission.answers.diamondShape && (
                        <div className="bg-accent-sky/10 p-3 rounded-lg">
                          <strong className="font-heading">צורת יהלום:</strong>{' '}
                          <span className="font-body">{getAnswerLabel('diamondShape', submission.answers.diamondShape)}</span>
                        </div>
                      )}
                      {submission.answers.budget && (
                        <div className="bg-accent-sky/10 p-3 rounded-lg">
                          <strong className="font-heading">תקציב:</strong>{' '}
                          <span className="font-body">{getAnswerLabel('budget', submission.answers.budget)}</span>
                        </div>
                      )}
                      {submission.answers.deadline && (
                        <div className="bg-accent-sky/10 p-3 rounded-lg">
                          <strong className="font-heading">דדליין:</strong>{' '}
                          <span className="font-body">{submission.answers.deadline}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-text-dark/60 font-body text-sm">
                      לא נמצאו תשובות לשאלון עבור ליד זה
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-6 pt-6 border-t border-accent-sky/20">
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setSelectedLead(null);
                  handleEdit(selectedLead);
                }}
              >
                ערוך ליד
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={() => setSelectedLead(null)}
              >
                סגור
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}

