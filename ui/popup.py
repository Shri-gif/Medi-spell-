from PySide6.QtWidgets import QListWidget
from PySide6.QtCore import Qt


class SuggestionPopup(QListWidget):
    def __init__(self):
        super().__init__()

        self.setWindowFlags(Qt.Popup)

        self.setMinimumWidth(350)
        self.setMaximumHeight(200)

        self.setStyleSheet("""
            QListWidget{
                background:#2C2C2C;
                color:white;
                border:1px solid #555;
                border-radius:8px;
                font-size:14px;
                padding:5px;
            }

            QListWidget::item{
                padding:8px;
            }

            QListWidget::item:selected{
                background:#0A84FF;
                color:white;
            }
        """)

    def show_suggestions(self, words):
        self.clear()

        if not words:
            self.hide()
            return

        self.addItems(words)
        self.show()
