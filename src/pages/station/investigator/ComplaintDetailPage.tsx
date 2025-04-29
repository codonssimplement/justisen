import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface ReceptionComplaint {
  id: string;
  victimName: string;
  location: string;
  date: string;
  crimeType: string;
  description: string;
  files: string[];
  status: string;
  assignment?: string;
  createdAt: string;
}

export default function ComplaintDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState<ReceptionComplaint | null>(null);
  const [comments, setComments] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  // Stepper
  const steps = ['Évaluation initiale', 'Collecte de preuves', 'Analyse', 'Rapport final'];
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const data = localStorage.getItem('receptionComplaints');
    if (data && id) {
      const all: ReceptionComplaint[] = JSON.parse(data);
      const found = all.find(c => c.id === id);
      if (found) setComplaint(found);
    }
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(Array.from(e.target.files));
  };

  const handleClose = () => {
    if (!complaint) return;
    if (window.confirm('Voulez-vous clôturer définitivement cette enquête ?')) {
      const updated = { ...complaint, status: 'Clôturée' };
      const data = JSON.parse(localStorage.getItem('receptionComplaints') || '[]') as ReceptionComplaint[];
      const newData = data.map(c => c.id === updated.id ? updated : c);
      localStorage.setItem('receptionComplaints', JSON.stringify(newData));
      alert('Enquête clôturée. Notification envoyée au commissaire.');
      navigate('/station/investigator');
    }
  };

  if (!complaint) return <DashboardLayout onLogout={() => {}}><p className="p-6 text-center text-gray-600">Plainte non trouvée.</p></DashboardLayout>;

  return (
    <DashboardLayout onLogout={() => {}}>
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        <Card className="shadow-lg">
          <CardHeader className="bg-police-navy p-4 rounded-t-lg">
            <CardTitle className="text-white text-2xl font-semibold">Plainte #{complaint.id}</CardTitle>
          </CardHeader>
          <CardContent className="bg-white p-6 space-y-6 rounded-b-lg">
            <div className="grid grid-cols-2 gap-4">
              <div><span className="text-sm text-gray-500">Victime</span><br/><span className="font-medium">{complaint.victimName}</span></div>
              <div><span className="text-sm text-gray-500">Date</span><br/><span className="font-medium">{new Date(complaint.createdAt).toLocaleDateString()}</span></div>
              <div><span className="text-sm text-gray-500">Type</span><br/><span className="font-medium">{complaint.crimeType}</span></div>
              <div><span className="text-sm text-gray-500">Statut</span><br/><span className="font-medium">{complaint.status}</span></div>
            </div>
            <div>
              <span className="text-sm text-gray-500">Description</span>
              <p className="mt-1 p-3 bg-gray-50 rounded">{complaint.description}</p>
            </div>
            {complaint.files?.length > 0 && (
              <div>
                <span className="text-sm text-gray-500">Pièces jointes</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {complaint.files.map((f, i) => (
                    <a key={i} href={`#`} className="px-3 py-1 bg-gray-100 text-sm rounded hover:bg-gray-200" title={f}>{f}</a>
                  ))}
                </div>
              </div>
            )}
            <div className="space-y-2">
              <span className="text-sm text-gray-500">Nouveaux commentaires / preuves</span>
              <Textarea placeholder="Entrez vos commentaires..." value={comments} onChange={e => setComments(e.target.value)} className="w-full border-gray-300" />
              <input type="file" multiple onChange={handleFileChange} className="mt-1" />
            </div>
            {/* Stepper */}
            <div>
              <span className="text-sm text-gray-500">Étapes de traitement</span>
              <ol className="mt-2 flex space-x-4">
                {steps.map((step, idx) => (
                  <li key={idx} className={
                    idx < currentStep ? 'text-green-600' : idx === currentStep ? 'text-blue-600' : 'text-gray-400'
                  }>{step}</li>
                ))}
              </ol>
              <div className="mt-4 flex justify-between">
                <Button size="sm" disabled={currentStep===0} onClick={() => setCurrentStep(s=>s-1)}>Précédent</Button>
                <Button size="sm" disabled={currentStep===steps.length-1} onClick={() => setCurrentStep(s=>s+1)}>Suivant</Button>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <Button className="bg-gray-200 text-gray-700 hover:bg-gray-300" onClick={() => navigate(-1)}>Retour</Button>
              <Button className="bg-police-red text-white hover:bg-opacity-90" onClick={handleClose}>Clôturer</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
