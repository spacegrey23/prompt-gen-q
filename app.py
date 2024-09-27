import random

# Opcje dla każdego aspektu projektu
opcje = {
    "kategorie": ["Krajobraz", "Portret", "Martwa natura", "Abstrakcja", "Scena rodzajowa", "Fantastyka"],
    "style": {
        "Krajobraz": ["Impresjonizm", "Realizm", "Ekspresjonizm"],
        "Portret": ["Realizm", "Pop-art", "Surrealizm"],
        "Martwa natura": ["Hiperrealizm", "Kubizm", "Barok"],
        "Abstrakcja": ["Geometryczna", "Liryczna", "Ekspresjonizm abstrakcyjny"],
        "Scena rodzajowa": ["Realizm", "Impresjonizm", "Symbolizm"],
        "Fantastyka": ["Surrealizm", "Digital art", "Concept art"]
    },
    "oswietlenie": ["Naturalne", "Sztuczne", "Mieszane", "Dramatyczne", "Miękkie", "Ostre"],
    "kompozycje": ["Symetryczna", "Asymetryczna", "Trójkątna", "Spiralna", "Złoty podział", "Radialna"],
    "tekstury": ["Gładka", "Szorstka", "Ziarnista", "Puszysta", "Metaliczna", "Organiczna"],
    "detale": ["Minimalistyczne", "Bogate", "Subtelne", "Wyraziste", "Geometryczne", "Organiczne"],
    "media": ["Farba olejna", "Akwarela", "Akryl", "Pastel", "Grafika cyfrowa", "Mieszana technika"],
    "kolorystyka": ["Monochromatyczna", "Analogiczna", "Komplementarna", "Triada", "Ciepła", "Zimna"],
    "narzedzia": ["Pędzel", "Szpachla", "Aerograf", "Tablet graficzny", "Ołówek", "Węgiel"]
}

saved_prompts = []

def generuj_losowy_prompt():
    prompt = {}
    for key in opcje:
        if key == "style":
            prompt[key] = random.choice(opcje[key][prompt["kategorie"]])
        else:
            prompt[key] = random.choice(opcje[key])
    return prompt

def prompt_to_string(prompt):
    return ", ".join([f"{key}: {value}" for key, value in prompt.items()])

def wybierz_opcje():
    prompt = {}
    for key in opcje:
        print(f"\nWybierz {key}:")
        if key == "style":
            for i, option in enumerate(opcje[key][prompt["kategorie"]], 1):
                print(f"{i}. {option}")
            choice = int(input("Twój wybór: "))
            prompt[key] = opcje[key][prompt["kategorie"]][choice-1]
        else:
            for i, option in enumerate(opcje[key], 1):
                print(f"{i}. {option}")
            choice = int(input("Twój wybór: "))
            prompt[key] = opcje[key][choice-1]
    return prompt

def main():
    while True:
        print("\n--- Generator Promptów Graficznych ---")
        print("1. Stwórz nowy prompt")
        print("2. Wygeneruj losowy prompt")
        print("3. Wyświetl zapisane prompty")
        print("4. Wyjdź")
        
        choice = input("Wybierz opcję: ")
        
        if choice == "1":
            prompt = wybierz_opcje()
            prompt_str = prompt_to_string(prompt)
            print("\nWygenerowany prompt:")
            print(prompt_str)
            edit = input("Czy chcesz edytować prompt? (t/n): ")
            if edit.lower() == 't':
                prompt_str = input("Wprowadź zmodyfikowany prompt: ")
            save = input("Czy chcesz zapisać ten prompt? (t/n): ")
            if save.lower() == 't':
                saved_prompts.append(prompt_str)
            print("Prompt skopiowany do schowka (symulacja)")
        
        elif choice == "2":
            prompt = generuj_losowy_prompt()
            prompt_str = prompt_to_string(prompt)
            print("\nWygenerowany losowy prompt:")
            print(prompt_str)
            save = input("Czy chcesz zapisać ten prompt? (t/n): ")
            if save.lower() == 't':
                saved_prompts.append(prompt_str)
            print("Prompt skopiowany do schowka (symulacja)")
        
        elif choice == "3":
            if saved_prompts:
                print("\nZapisane prompty:")
                for i, prompt in enumerate(saved_prompts, 1):
                    print(f"{i}. {prompt}")
            else:
                print("Brak zapisanych promptów.")
        
        elif choice == "4":
            print("Dziękuję za korzystanie z Generatora Promptów Graficznych!")
            break
        
        else:
            print("Nieprawidłowy wybór. Spróbuj ponownie.")

if __name__ == "__main__":
    main()