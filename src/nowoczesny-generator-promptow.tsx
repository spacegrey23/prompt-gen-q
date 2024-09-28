import React, { useState, useEffect, useCallback } from 'react';
import CardHeader from "@/components/ui/CardHeader";
import CardTitle from "@/components/ui/CardTitle";
import CardDescription from "@/components/ui/CardDescription";
import CardContent from "@/components/ui/CardContent";
import TabsList from "@/components/ui/TabsList";
import TabsTrigger from "@/components/ui/TabsTrigger";
import TabsContent from "@/components/ui/TabsContent";
import SelectTrigger from "@/components/ui/SelectTrigger";
import SelectValue from "@/components/ui/SelectValue";
import SelectContent from "@/components/ui/SelectContent";
import SelectItem from "@/components/ui/SelectItem";
import CardFooter from "@/components/ui/CardFooter";
import ToastContainer from "react-toastify/ToastContainer";



const options = {
  kategorie: ["Krajobraz", "Portret", "Martwa natura", "Abstrakcja", "Scena rodzajowa", "Fantastyka"],
  style: {
    "Krajobraz": ["Impresjonizm", "Realizm", "Ekspresjonizm"],
    "Portret": ["Realizm", "Pop-art", "Surrealizm"],
    "Martwa natura": ["Hiperrealizm", "Kubizm", "Barok"],
    "Abstrakcja": ["Geometryczna", "Liryczna", "Ekspresjonizm abstrakcyjny"],
    "Scena rodzajowa": ["Realizm", "Impresjonizm", "Symbolizm"],
    "Fantastyka": ["Surrealizm", "Digital art", "Concept art"]
  },
  oswietlenie: ["Naturalne", "Sztuczne", "Mieszane", "Dramatyczne", "Miękkie", "Ostre"],
  kompozycje: ["Symetryczna", "Asymetryczna", "Trójkątna", "Spiralna", "Złoty podział", "Radialna"],
  tekstury: ["Gładka", "Szorstka", "Ziarnista", "Puszysta", "Metaliczna", "Organiczna"],
  detale: ["Minimalistyczne", "Bogate", "Subtelne", "Wyraziste", "Geometryczne", "Organiczne"],
  media: ["Farba olejna", "Akwarela", "Akryl", "Pastel", "Grafika cyfrowa", "Mieszana technika"],
  kolorystyka: ["Monochromatyczna", "Analogiczna", "Komplementarna", "Triada", "Ciepła", "Zimna"],
  narzedzia: ["Pędzel", "Szpachla", "Aerograf", "Tablet graficzny", "Ołówek", "Węgiel"]
};

const GeneratorPromptow = () => {
  const [prompt, setPrompt] = useState({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');

  const generateDescriptivePrompt = useCallback(() => {
    // Twoja logika generowania promptów
  }, [prompt]);

  useEffect(() => {
    generateDescriptivePrompt();
}, [prompt, generateDescriptivePrompt]); // Dodaj generateDescriptivePrompt
  
  

  const handleSelect = (category, value) => {
    setPrompt(prev => ({ ...prev, [category]: value }));
  };

  const generateDescriptivePrompt = () => {
    if (Object.keys(prompt).length === 0) return;

    let description = `Stwórz ${prompt.kategorie || 'obraz'} w stylu ${prompt.style || 'dowolnym'}. `;
    
    if (prompt.oswietlenie) {
      description += `Zastosuj ${prompt.oswietlenie.toLowerCase()} oświetlenie, które podkreśli nastrój kompozycji. `;
    }
    
    if (prompt.kompozycje) {
      description += `Wykorzystaj ${prompt.kompozycje.toLowerCase()} kompozycję, aby stworzyć interesujący układ elementów. `;
    }
    
    if (prompt.tekstury) {
      description += `Dodaj ${prompt.tekstury.toLowerCase()} tekstury, które nadadzą głębi i charakteru dziełu. `;
    }
    
    if (prompt.detale) {
      description += `Zwróć uwagę na ${prompt.detale.toLowerCase()} detale, które wzbogacą całość. `;
    }
    
    if (prompt.media) {
      description += `Użyj ${prompt.media.toLowerCase()} jako głównego medium artystycznego. `;
    }
    
    if (prompt.kolorystyka) {
      description += `Zastosuj ${prompt.kolorystyka.toLowerCase()} paletę kolorów, aby stworzyć odpowiedni nastrój. `;
    }
    
    if (prompt.narzedzia) {
      description += `Głównym narzędziem do stworzenia tego dzieła będzie ${prompt.narzedzia.toLowerCase()}. `;
    }

    setGeneratedPrompt(description.trim());
  };

  const generateRandomPrompt = () => {
    const newPrompt = {};
    Object.keys(options).forEach(key => {
      if (key === 'style') {
        const kategoria = newPrompt['kategorie'];
        newPrompt[key] = options.style[kategoria][Math.floor(Math.random() * options.style[kategoria].length)];
      } else {
        newPrompt[key] = options[key][Math.floor(Math.random() * options[key].length)];
      }
    });
    setPrompt(newPrompt);
  };

  const savePrompt = () => {
    if (generatedPrompt) {
      setSavedPrompts(prev => [...prev, generatedPrompt]);
      toast.success('Prompt zapisany!');
    }
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
    toast.info('Prompt skopiowany do schowka!');
  };

  const resetPrompt = () => {
    setPrompt({});
    setGeneratedPrompt('');
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Nowoczesny Generator Promptów Graficznych</CardTitle>
          <CardDescription>Stwórz inspirujące prompty dla swoich projektów artystycznych</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="manual">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manual">Manualny</TabsTrigger>
              <TabsTrigger value="random">Losowy</TabsTrigger>
            </TabsList>
            <TabsContent value="manual">
              <div className="space-y-4">
                {Object.keys(options).map(category => (
                  <Select key={category} onValueChange={(value) => handleSelect(category, value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={`Wybierz ${category}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {(category === 'style' && prompt.kategorie 
                        ? options.style[prompt.kategorie] 
                        : options[category]).map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="random">
              <Button onClick={generateRandomPrompt} className="w-full">Generuj Losowy Prompt</Button>
            </TabsContent>
          </Tabs>
          <TextArea
            value={generatedPrompt}
            onChange={(e) => setGeneratedPrompt(e.target.value)}
            placeholder="Wygenerowany prompt pojawi się tutaj..."
            className="mt-4"
            rows={6}
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={copyPrompt}>Kopiuj Prompt</Button>
          <Button onClick={savePrompt}>Zapisz Prompt</Button>
          <Button onClick={resetPrompt} variant="outline">Wyczyść</Button>
        </CardFooter>
      </Card>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Zapisane Prompty</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {savedPrompts.map((savedPrompt, index) => (
              <li key={index} className="bg-secondary p-2 rounded">{savedPrompt}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default GeneratorPromptow;
