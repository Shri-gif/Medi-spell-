import sys
from PySide6.QtWidgets import QApplication, QLabel, QWidget, QVBoxLayout


class MainWindow(QWidget):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("MediSpellAI")
        self.resize(900, 600)

        layout = QVBoxLayout()

        title = QLabel("Welcome to MediSpellAI")
        title.setStyleSheet("""
            font-size:28px;
            font-weight:bold;
        """)

        layout.addWidget(title)

        self.setLayout(layout)


app = QApplication(sys.argv)

window = MainWindow()
window.show()

sys.exit(app.exec())
