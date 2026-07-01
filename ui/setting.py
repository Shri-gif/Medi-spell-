from PySide6.QtWidgets import (
    QWidget,
    QLabel,
    QPushButton,
    QVBoxLayout,
    QCheckBox
)


class SettingsWindow(QWidget):

    def __init__(self):
        super().__init__()

        self.setWindowTitle("Settings")
        self.resize(400, 300)

        layout = QVBoxLayout()

        title = QLabel("MediSpellAI Settings")
        title.setStyleSheet("font-size:20px;font-weight:bold;")

        layout.addWidget(title)

        self.voice = QCheckBox("Enable Voice Recognition")
        self.voice.setChecked(True)

        self.popup = QCheckBox("Enable Suggestion Popup")
        self.popup.setChecked(True)

        self.dark = QCheckBox("Dark Theme")
        self.dark.setChecked(True)

        save = QPushButton("Save Settings")

        layout.addWidget(self.voice)
        layout.addWidget(self.popup)
        layout.addWidget(self.dark)

        layout.addStretch()

        layout.addWidget(save)

        self.setLayout(layout)
