import { groupedTranslations } from "@mongez/localization";

export const moonlightTranslations = {
  somethingWentWrong: {
    en: "Something went wrong",
    ar: "حدث خطأ ما",
    fr: "Quelque chose s'est mal passé",
    it: "Qualcosa è andato storto",
    es: "Algo salió mal",
    de: "Etwas ist schief gelaufen",
  },
  reset: {
    en: "Reset",
    ar: "إعادة تعيين",
    fr: "Réinitialiser",
    it: "Ripristina",
    es: "Reiniciar",
    de: "Zurücksetzen",
  },
  didYouKnow: {
    en: "Did you know?",
    ar: "هل تعلم؟",
    fr: "Saviez-vous que?",
    it: "Lo sapevi?",
    es: "¿Sabías?",
    de: "Wusstest du?",
  },
  edit: {
    en: "Edit",
    ar: "تعديل",
    fr: "Modifier",
    it: "Modificare",
    es: "Editar",
    de: "Bearbeiten",
  },
  delete: {
    en: "Delete",
    ar: "حذف",
    fr: "Supprimer",
    it: "Elimina",
    es: "Eliminar",
    de: "Löschen",
  },
  all: {
    en: "All",
    ar: "الكل",
    fr: "Tout",
    it: "Tutto",
    es: "Todo",
    de: "Alle",
  },
  yes: {
    en: "Yes",
    ar: "نعم",
    fr: "Oui",
    it: "Sì",
    es: "Sí",
    de: "Ja",
  },
  no: {
    en: "No",
    ar: "لا",
    fr: "Non",
    it: "No",
    es: "No",
    de: "Nein",
  },
  sortDirection: {
    en: "Sort :direction",
    ar: "ترتيب :direction",
    fr: "Trier :direction",
    it: "Ordina :direction",
    es: "Ordenar :direction",
    de: "Sortieren :direction",
  },
  asc: {
    en: "Ascending",
    ar: "تصاعدي",
    fr: "Ascendant",
    it: "Ascendente",
    es: "Ascendente",
    de: "Aufsteigend",
  },
  desc: {
    en: "Descending",
    ar: "تنازلي",
    fr: "Descendant",
    it: "Discendente",
    es: "Descendente",
    de: "Absteigend",
  },
  remove: {
    en: "Remove",
    ar: "حذف",
    fr: "Supprimer",
    it: "Rimuovere",
    es: "Eliminar",
    de: "Entfernen",
  },
  uploadError: {
    en: "Upload Error",
    ar: "خطأ في الرفع",
    fr: "Erreur de téléchargement",
    it: "Errore di caricamento",
    es: "Error de carga",
    de: "Fehler beim Hochladen",
  },
  imageMinWidthError: {
    en: ":file width must be at least :width px",
    ar: "يجب أن يكون عرض :file على الأقل :width بكسل",
    fr: "La largeur de :file doit être d'au moins :width px",
    it: "Larghezza :file deve essere almeno :width px",
    es: "El ancho de :file debe ser de al menos :width px",
    de: ":file Breite muss mindestens :width px betragen",
  },
  imageMinHeightError: {
    en: ":file height must be at least :height px",
    ar: "يجب أن يكون ارتفاع :file على الأقل :height بكسل",
    fr: "La hauteur de :file doit être d'au moins :height px",
    it: "L'altezza :file deve essere almeno :height px",
    es: "La altura de :file debe ser de al menos :height px",
    de: ":file Höhe muss mindestens :height px betragen",
  },
  imageMaxWidthError: {
    en: ":file width must be at most :width px",
    ar: "يجب أن يكون عرض :file على الأكثر :width بكسل",
    fr: "La largeur de :file doit être au maximum :width px",
    it: "Larghezza :file deve essere al massimo :width px",
    es: "El ancho de :file debe ser de al menos :width px",
    de: ":file Breite muss höchstens :width px betragen",
  },
  imageMaxHeightError: {
    en: ":file height must be at most :height px",
    ar: "يجب أن يكون ارتفاع :file على الأكثر :height بكسل",
    fr: "La hauteur de :file doit être au maximum :height px",
    it: "L'altezza :file deve essere al massimo :height px",
    es: "La altura de :file debe ser de al menos :height px",
    de: ":file Höhe muss höchstens :height px betragen",
  },
  imageWidthError: {
    en: ":file width must be :width px",
    ar: "يجب أن يكون عرض :file :width بكسل",
    fr: "La largeur de :file doit être :width px",
    it: "Larghezza :file deve essere :width px",
    es: "El ancho de :file debe ser :width px",
    de: ":file Breite muss :width px betragen",
  },
  imageHeightError: {
    en: ":file height must be :height px",
    ar: "يجب أن يكون ارتفاع :file :height بكسل",
    fr: "La hauteur de :file doit être :height px",
    it: "L'altezza :file deve essere :height px",
    es: "La altura de :file debe ser :height px",
    de: ":file Höhe muss :height px betragen",
  },
  imageMaxSizeError: {
    en: ":file size must be at most :size KB",
    ar: "يجب أن يكون حجم :file على الأكثر :size كيلوبايت",
    fr: "La taille de :file doit être au maximum :size ko",
    it: "La dimensione di :file deve essere al massimo :size KB",
    es: "El tamaño de :file debe ser de al menos :size KB",
    de: ":file Größe muss höchstens :size KB betragen",
  },
  imageMinSizeError: {
    en: ":file size must be at least :size KB",
    ar: "يجب أن يكون حجم :file على الأقل :size كيلوبايت",
    fr: "La taille de :file doit être d'au moins :size ko",
    it: "La dimensione di :file deve essere almeno :size KB",
    es: "El tamaño de :file debe ser de al menos :size KB",
    de: ":file Größe muss mindestens :size KB betragen",
  },
  selectLocation: {
    en: "Select Location",
    ar: "اختر الموقع",
    fr: "Sélectionnez l'emplacement",
    it: "Seleziona posizione",
    es: "Seleccionar ubicación",
    de: "Ort auswählen",
  },
  save: {
    en: "Save",
    ar: "حفظ",
    fr: "Sauvegarder",
    it: "Salvare",
    es: "Salvar",
    de: "Speichern",
  },
  submit: {
    en: "Submit",
    ar: "إرسال",
    fr: "Soumettre",
    it: "Invia",
    es: "Enviar",
    de: "einreichen",
  },
  clone: {
    en: "Clone",
    ar: "نسخ",
    fr: "Cloner",
    it: "Clonare",
    es: "Clonar",
    de: "Klonen",
  },
  keyboardShortcuts: {
    en: "Keyboard Shortcuts",
    ar: "اختصارات لوحة المفاتيح",
    fr: "Raccourcis clavier",
    it: "Scorciatoie da tastiera",
    es: "Atajos de teclado",
    de: "Tastaturkürzel",
  },
  pleaseWaitTableIsLoading: {
    en: "Please wait while we load the table data",
    ar: "يرجى الانتظار حتى نحمل بيانات الجدول",
    fr: "Veuillez patienter pendant que nous chargeons les données du tableau",
    it: "Attendere prego mentre carichiamo i dati della tabella",
    es: "Espere mientras cargamos los datos de la tabla",
    de: "Bitte warten Sie, während wir die Tabellendaten laden",
  },
  loading: {
    en: "Loading",
    ar: "جاري التحميل",
    fr: "Chargement",
    it: "Caricamento",
    es: "Cargando",
    de: "Wird geladen",
  },
  showMoreFilters: {
    en: "Show more filters",
    ar: "عرض المزيد من الفلاتر",
    fr: "Afficher plus de filtres",
    it: "Mostra più filtri",
    es: "Mostrar más filtros",
    de: "Mehr Filter anzeigen",
  },
  showAllFilters: {
    en: "Show all filters",
    ar: "عرض جميع الفلاتر",
    fr: "Afficher tous les filtres",
    it: "Mostra tutti i filtri",
    es: "Mostrar todos los filtros",
    de: "Alle Filter anzeigen",
  },
  limitOptions: {
    en: "Limit Options",
    ar: "عدد العناصر المعروضة",
    fr: "Options de limite",
    it: "Opzioni di limite",
    es: "Opciones de límite",
    de: "Limitoptionen",
  },
  showLessFilters: {
    en: "Show less filters",
    ar: "عرض أقل من الفلاتر",
    fr: "Afficher moins de filtres",
    it: "Mostra meno filtri",
    es: "Mostrar menos filtros",
    de: "Weniger Filter anzeigen",
  },
  invalidImageFile: {
    en: "Invalid image file",
    ar: "ملف صورة غير صالح",
    fr: "Fichier image invalide",
    it: "File immagine non valido",
    es: "Archivo de imagen no válido",
    de: "Ungültige Bilddatei",
  },
  notFound: {
    en: "Not Found",
    ar: "غير موجود",
    fr: "Non trouvé",
    it: "Non trovato",
    es: "No encontrado",
    de: "Nicht gefunden",
  },
  select: {
    en: "Select",
    ar: "اختر",
    fr: "Sélectionner",
    it: "Selezionare",
    es: "Seleccionar",
    de: "Wählen",
  },
  retry: {
    en: "Retry",
    ar: "إعادة المحاولة",
    fr: "Réessayer",
    it: "Riprova",
    es: "Reintentar",
    de: "Wiederholen",
  },
  cancel: {
    en: "Cancel",
    ar: "إلغاء",
    fr: "Annuler",
    it: "Annulla",
    es: "Cancelar",
    de: "Stornieren",
  },
  saveAndClear: {
    en: "Save and Clear",
    ar: "حفظ ومسح",
    fr: "Enregistrer et effacer",
    it: "Salva e cancella",
    es: "Guardar y borrar",
    de: "Speichern und löschen",
  },
  savingForm: {
    en: "Saving form",
    ar: "جاري الحفظ",
    fr: "Enregistrement du formulaire",
    it: "Salvataggio del modulo",
    es: "Guardando el formulario",
    de: "Formular speichern",
  },
  successFormSaved: {
    en: "Form Has Been Saved Successfully",
    ar: "تم حفظ النموذج بنجاح",
    fr: "Le formulaire a été enregistré avec succès",
    it: "Il modulo è stato salvato con successo",
    es: "El formulario se ha guardado correctamente",
    de: "Formular wurde erfolgreich gespeichert",
  },
  success: {
    en: "Success",
    ar: "نجاح",
    fr: "Succès",
    it: "Successo",
    es: "Éxito",
    de: "Erfolg",
  },
  error: {
    en: "Error",
    ar: "خطأ",
    fr: "Erreur",
    it: "Errore",
    es: "Error",
    de: "Fehler",
  },
  warning: {
    en: "Warning",
    ar: "تحذير",
    fr: "Attention",
    it: "Avvertimento",
    es: "Advertencia",
    de: "Warnung",
  },
  create: {
    en: "Create",
    ar: "إنشاء",
    fr: "Créer",
    it: "Creare",
    es: "Crear",
    de: "Erstellen",
  },
  createNewRecord: {
    en: "Create New Record",
    ar: "إنشاء سجل جديد",
    fr: "Créer un nouveau dossier",
    it: "Crea nuovo record",
    es: "Crear nuevo registro",
    de: "Neuen Datensatz erstellen",
  },
  saveFailed: {
    en: "Save Failed",
    ar: "فشل الحفظ",
    fr: "Échec de l'enregistrement",
    it: "Salvataggio non riuscito",
    es: "Error al guardar",
    de: "Speichern fehlgeschlagen",
  },
  rowSelection: {
    en: "Row Selection",
    ar: "تحديد الصفوف",
  },
  updateItem: {
    en: "Update :item",
    ar: "تحديث بيانات :item",
    fr: "Mettre à jour :item",
    it: "Aggiorna :item",
    es: "Actualizar :item",
    de: "Aktualisieren :item",
  },
  createItem: {
    en: "Create new :item",
    ar: "إنشاء :item جديد",
    fr: "Créer un nouveau :item",
    it: "Crea nuovo :item",
    es: "Crear nuevo :item",
    de: "Erstelle neu :item",
  },
  deleteItem: {
    en: "Delete :item",
    ar: "حذف :item",
    fr: "Supprimer :item",
    it: "Elimina :item",
    es: "Eliminar :item",
    de: "Löschen :item",
  },

  noData: {
    en: "No data found",
    ar: "لا يوجد بيانات",
  },
  deleteBulk: {
    en: "Delete (:count)",
    ar: "حذف (:count)",
  },
  confirmBulkRows: {
    en: "Are you sure you want to delete (:count) selected rows?",
    ar: "هل أنت متأكد من حذف (:count) الصفوف المحددة؟",
  },
  bulkDeleteHeading: {
    en: "Bulk Delete Confirm",
    ar: "تأكيد حذف متعدد",
  },
  cancelDelete: {
    en: "No don't delete it",
    ar: "لا، لا تحذفه",
  },
  confirmDelete: {
    en: "Yes, delete it",
    ar: "تأكيد الحذف",
  },
  confirm: {
    en: "Confirm",
    ar: "تأكيد",
  },
  confirmDeleteMessage: {
    en: "Are you sure you want to delete this record? This action is destructive and can not be restored.",
    ar: "هل أنت متأكد من أنك تريد حذف هذا السجل؟ هذا الإجراء غير قابل للتراجع عنه ولا يمكن إعادته.",
  },
  singleDeleteHeading: {
    en: "Delete Confirm",
    ar: "تأكيد الحذف",
  },
  deleting: {
    en: "Deleting...",
    ar: "جاري الحذف...",
  },
  deletingInProgress: {
    en: "Deleting in progress...",
    ar: "جاري الحذف...",
  },
  deleteSuccess: {
    en: "Delete Operation has been done successfully",
    ar: "تمت عملية الحذف بنجاح",
  },
  deleteError: {
    en: "Error while deleting",
    ar: "حدث خطأ أثناء الحذف",
  },
  clear: {
    en: "Clear",
    ar: "مسح",
    fr: "Effacer",
    it: "Cancellare",
    es: "Borrar",
    de: "Klar",
  },
  uploading: {
    en: "Uploading",
    ar: "جاري الرفع",
  },
  selectFile: {
    en: "Please select a file",
    ar: "ارفع ملف",
  },
  uploadingFile: {
    en: "Uploading file",
    ar: "جاري رفع الملف",
  },
  uploadingFileDescription: {
    en: "Please wait while we upload your file",
    ar: "يرجى الانتظار حتى نرفع ملفك",
  },
  fileUploaded: {
    en: "Successful upload",
    ar: "عملية ناجحة",
  },
  uploadingFileFailed: {
    en: "Upload failed",
    ar: "فشلت العملية",
  },
  fileUploadedDescription: {
    en: "File has been uploaded successfully",
    ar: "تم رفع الملف بنجاح",
  },
  uploadingFiles: {
    en: "Uploading :current/:count files",
    ar: "جاري رفع :current/:count ملف",
  },
  filesUploaded: {
    en: "Files uploaded successfully",
    ar: "تم رفع الملفات",
  },
  filesUploadedSuccessfully: {
    en: ":count/:count files has been uploaded successfully",
    ar: "تم رفع :count/:count ملف بنجاح",
  },
  uploadingFilesFailed: {
    en: "Upload failed",
    ar: "فشلت عملية الرفع",
  },
  uploadingFilesFailedDescription: {
    en: ":count have been failed to upload",
    ar: "فشلت عملية رفع :count ملف",
  },
  deletingFile: {
    en: "Deleting file",
    ar: "جاري حذف الملف",
  },
  fileIsBeingForDeletion: {
    en: "File is being deleted right now, please wait a moment",
    ar: "الملف يتم حذفه حاليا، يرجى الانتظار لحظات",
  },
  fileDeleted: {
    en: "File deleted",
    ar: "تم حذف الملف",
  },
  invalidUploadedFile: {
    en: "Error in uploading :file",
    ar: "حدث خطأ أثناء رفع :file",
  },
  fileDeletedSuccessfully: {
    en: "File has been deleted successfully",
    ar: "تم حذف الملف بنجاح",
  },
  deleteFileFailed: {
    en: "Delete failed",
    ar: "فشلت عملية الحذف",
  },
  partialUploadSuccess: {
    en: "Partial upload success",
    ar: "تم رفع بعض الملفات بنجاح",
  },
  partialUploadSuccessDescription: {
    en: ":success/:count files has been uploaded successfully",
    ar: "تم رفع :success/:count ملف بنجاح",
  },
  uploadingFilesDescription: {
    en: "Please wait while we upload your files (:current/:count)",
    ar: "يرجى الانتظار حتى نرفع ملفاتك (:current/:count)",
  },
  tableResultsInfo: {
    en: "Showing :current of :total entries",
    ar: "عرض :current من :total مدخل",
  },
  displayedColumns: {
    en: "Displayed Columns",
    ar: "الأعمدة المعروضة",
  },
  defaultDisplayedColumns: {
    en: "Default Displayed Columns",
    ar: "الأعمدة المعروضة الافتراضية",
  },
  alwaysDisplayedColumns: {
    en: "Always Displayed Columns",
    ar: "الأعمدة المعروضة دائما",
  },
  otherColumns: {
    en: "Other Columns",
    ar: "الأعمدة الأخرى",
  },
  rowsControl: {
    en: "Rows Control",
    ar: "تحكم في الصفوف",
  },
};

groupedTranslations("moonlight", moonlightTranslations);
