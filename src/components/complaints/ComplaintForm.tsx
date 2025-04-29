import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, FileUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Complaint, ComplaintStatus } from "@/types";
import { toast } from "sonner";

interface ComplaintFormProps {
  onSubmit: (complaint: Partial<Complaint>) => void;
  onCancel: () => void;
}

const ComplaintForm = ({ onSubmit, onCancel }: ComplaintFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [complaintType, setComplaintType] = useState("");
  const [location, setLocation] = useState("");
  const [incidentDate, setIncidentDate] = useState<Date | undefined>(undefined);
  const [files, setFiles] = useState<FileList | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !complaintType || !location || !incidentDate) {
      toast.error("Information manquante", {
        description: "Veuillez remplir tous les champs obligatoires.",
      });
      return;
    }

    setIsSubmitting(true);

    // Prepare attachment URLs (in a real app, you'd upload these files and get URLs)
    const attachments = files ? Array.from(files).map((_, i) => `attachment-${i}`) : [];
    
    const newComplaint: Partial<Complaint> = {
      title,
      description,
      complaintType,
      location,
      incidentDate,
      complaintDate: new Date(),
      status: "pending-assignment" as ComplaintStatus,
      attachments,
    };

    // Simulate API delay
    setTimeout(() => {
      onSubmit(newComplaint);
      setIsSubmitting(false);
      
      // In a real app, this would be done after the server confirms success
      toast.success("Plainte enregistrée", {
        description: "La plainte a été enregistrée avec succès.",
      });
    }, 1000);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto border-t-4 border-t-police-navy">
      <CardHeader>
        <CardTitle>Enregistrer une nouvelle plainte</CardTitle>
        <CardDescription>
          Saisissez les informations relatives à la plainte déposée par le plaignant
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Titre de la plainte *</Label>
                <Input
                  id="title"
                  placeholder="Ex: Vol avec effraction"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="complaint-type">Type d'infraction *</Label>
                <Select value={complaintType} onValueChange={setComplaintType}>
                  <SelectTrigger id="complaint-type">
                    <SelectValue placeholder="Sélectionnez un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="theft">Vol</SelectItem>
                    <SelectItem value="assault">Agression/Violence</SelectItem>
                    <SelectItem value="burglary">Cambriolage</SelectItem>
                    <SelectItem value="fraud">Fraude/Escroquerie</SelectItem>
                    <SelectItem value="vandalism">Vandalisme</SelectItem>
                    <SelectItem value="harassment">Harcèlement</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Lieu des faits *</Label>
                <Input
                  id="location"
                  placeholder="Adresse/lieu où l'incident s'est produit"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="incident-date">Date de l'incident *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="incident-date"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !incidentDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {incidentDate ? (
                        format(incidentDate, "PPP", { locale: fr })
                      ) : (
                        <span>Sélectionnez une date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={incidentDate}
                      onSelect={setIncidentDate}
                      initialFocus
                      disabled={(date) => date > new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description détaillée *</Label>
              <Textarea
                id="description"
                placeholder="Décrivez les faits avec le plus de détails possible"
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="attachments">Pièces jointes</Label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Input 
                    id="attachments" 
                    type="file" 
                    multiple 
                    className="cursor-pointer"
                    onChange={(e) => setFiles(e.target.files)}
                  />
                </div>
                <Button type="button" variant="outline" className="flex items-center gap-2">
                  <FileUp className="h-4 w-4" />
                  <span>Uploader</span>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Types acceptés: .jpg, .png, .pdf, .mp3, .mp4 (max 10MB par fichier)
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              * Champs obligatoires
            </div>
            <div className="flex gap-2">
              <Button variant="outline" type="button" onClick={onCancel}>
                Annuler
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="bg-police-navy hover:bg-opacity-90"
              >
                {isSubmitting ? "Enregistrement..." : "Enregistrer la plainte"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ComplaintForm;
