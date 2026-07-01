from PySide6.QtWidgets import (
    QWidget,
    QLabel,
    QPushButton,
    QVBoxLayout,
    QHBoxLayout,
    QLineEdit,
    QListWidget
)
from PySide6.QtCore import Qt


class HomeWindow(QWidget):

    def __init__(self):
        super().__init__()

        self.setWindowTitle("MediSpellAI")
        self.resize(900, 650)

        self.setStyleSheet("""

            QWidget{
                background:#1E1E1E;
                color:white;
                font-size:14px;
            }

            QLineEdit{
                background:#2C2C2C;
                border:1px solid #444;
                border-radius:8px;
                padding:8px;
            }

            QPushButton{
                background:#0A84FF;
                border-radius:8px;
                padding:10px;
                color:white;
            }

            QListWidget{
                background:#2C2C2C;
                border-radius:8px;
            }

        """)

        mainLayout = QVBoxLayout()

        title = QLabel("MediSpellAI")
        title.setAlignment(Qt.AlignCenter)
        title.setStyleSheet("font-size:28px;font-weight:bold;")

        mainLayout.addWidget(title)

        self.searchBox = QLineEdit()
        self.searchBox.setPlaceholderText("Search Medical Term")

        mainLayout.addWidget(self.searchBox)

        self.micButton = QPushButton("🎤 Speak")

        mainLayout.addWidget(self.micButton)

        suggestionsLabel = QLabel("Suggestions")

        mainLayout.addWidget(suggestionsLabel)

        self.suggestions = QListWidget()

        self.suggestions.addItems([
            "Hepatomegaly",
            "Hypoechoic",
            "Cholelithiasis",
            "Nephrolithiasis"
        ])

        mainLayout.addWidget(self.suggestions)

        favoriteLabel = QLabel("Favorites")

        mainLayout.addWidget(favoriteLabel)

        self.favoriteList = QListWidget()

        self.favoriteList.addItems([
            "Liver",
            "Kidney",
            "Pancreas",
            "Gall Bladder"
        ])

        mainLayout.addWidget(self.favoriteList)

        status = QLabel("Status : Ready")

        mainLayout.addWidget(status)

        self.setLayout(mainLayout)
