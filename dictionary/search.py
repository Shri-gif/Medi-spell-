import json
import os


class MedicalDictionary:

    def __init__(self):

        current_folder = os.path.dirname(__file__)

        json_path = os.path.join(current_folder, "medical_terms.json")

        with open(json_path, "r", encoding="utf-8") as file:
            self.words = json.load(file)

    def search(self, text):

        if not text:
            return []

        text = text.lower()

        result = []

        for word in self.words:

            if word.lower().startswith(text):

                result.append(word)

        return result[:10]
