from speech.microphone import Microphone
from PySide6.QtCore import Qt, QTimer
from dictionary.search import MedicalDictionary

from PySide6.QtWidgets import (
    QWidget,
    QLabel,
    QPushButton,
    QVBoxLayout,
    QHBoxLayout,
    QLineEdit,
    QListWidget
)


class HomeWindow(QWidget):

    def __init__(self):
        super().__init__()
        self.dictionary = MedicalDictionary()
        self.microphone = Microphone()

        self.setWindowTitle("MediSpellAI")
        self.resize(950, 700)

        self.setStyleSheet("""

        QWidget{
            background:#121212;
            color:white;
            font-family:Segoe UI;
            font-size:14px;
        }

        QLabel{
            color:white;
        }

        QLineEdit{
            background:#1f1f1f;
            border:1px solid #444;
            border-radius:10px;
            padding:10px;
            font-size:14px;
        }

        QPushButton{
            background:#0A84FF;
            border:none;
            border-radius:10px;
            padding:10px;
            color:white;
            font-weight:bold;
        }

        QPushButton:hover{
            background:#2E9BFF;
        }

        QListWidget{
            background:#1f1f1f;
            border:1px solid #333;
            border-radius:10px;
            padding:5px;
        }

        """)

        mainLayout = QVBoxLayout()

        # ======================
        # Header
        # ======================

        header = QHBoxLayout()

        title = QLabel("🩺 MediSpellAI")
        title.setStyleSheet("font-size:28px;font-weight:bold;")

        settings = QPushButton("⚙ Settings")

        header.addWidget(title)
        header.addStretch()
        header.addWidget(settings)

        mainLayout.addLayout(header)

        # ======================
        # Search
        # ======================

        searchLabel = QLabel("Search Medical Term")

        self.searchBox = QLineEdit()
        self.searchBox.setPlaceholderText("Search here...")
        self.searchBox.textChanged.connect(self.search_medical_term)

        mainLayout.addWidget(searchLabel)
        mainLayout.addWidget(self.searchBox)

        # ======================
        # Mic
        # ======================

        self.micButton = QPushButton("🎤 Speak Now")
        self.micButton.setFixedHeight(55)
        self.micButton.clicked.connect(self.start_listening)

        mainLayout.addWidget(self.micButton)

        # ======================
        # Suggestions
        # ======================

        suggestionLabel = QLabel("Suggestions")
        suggestionLabel.setStyleSheet("font-size:18px;")

        self.suggestionList = QListWidget()

        self.suggestionList.addItems([
            "Hepatomegaly",
            "Hypoechoic",
            "Cholelithiasis",
            "Nephrolithiasis",
            "Hydronephrosis"
        ])

        mainLayout.addWidget(suggestionLabel)
        mainLayout.addWidget(self.suggestionList)

        # ======================
        # Favorites
        # ======================

        favLabel = QLabel("Favorites")
        favLabel.setStyleSheet("font-size:18px;")

        self.favoriteList = QListWidget()

        self.favoriteList.addItems([
            "Liver",
            "Kidney",
            "Pancreas",
            "Gall Bladder"
        ])

        mainLayout.addWidget(favLabel)
        mainLayout.addWidget(self.favoriteList)

        # ======================
        # Status
        # ======================

        self.status = QLabel("Status : Ready")

        self.status.setAlignment(Qt.AlignCenter)

        mainLayout.addWidget(self.status)

                self.setLayout(mainLayout)

    def search_medical_term(self):

        text = self.searchBox.text()

        results = self.dictionary.search(text)

        self.suggestionList.clear()

        self.suggestionList.addItems(results)

    def start_listening(self):

        self.microphone.start()

        self.status.setText("🎤 Status : Listening...")

        self.micButton.setEnabled(False)

        QTimer.singleShot(2000, self.stop_listening)

    def stop_listening(self):

        self.microphone.stop()

        self.status.setText("✅ Status : Ready")

        self.micButton.setEnabled(True)
