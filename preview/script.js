// Éléments interactifs pour la prévisualisation
document.addEventListener('DOMContentLoaded', function() {
  // Fonctionnalité de la fenêtre modale des tâches
  const taskModal = document.getElementById('taskModal');
  const addTaskButtons = document.querySelectorAll('.add-task-button');
  const modalCloseButton = document.querySelector('.modal-close');
  const cancelButton = document.querySelector('.button-secondary');
  
  // Afficher la fenêtre modale lors du clic sur ajouter une tâche
  addTaskButtons.forEach(button => {
    button.addEventListener('click', function() {
      taskModal.style.display = 'flex';
    });
  });
  
  // Fonctions pour fermer la fenêtre modale
  function closeModal() {
    taskModal.style.display = 'none';
  }
  
  modalCloseButton.addEventListener('click', closeModal);
  cancelButton.addEventListener('click', closeModal);
  
  // Fermer la fenêtre modale en cliquant à l'extérieur
  taskModal.addEventListener('click', function(event) {
    if (event.target === taskModal) {
      closeModal();
    }
  });
  
  // Soumission du formulaire de tâche (simulée)
  const taskForm = document.querySelector('.task-form');
  taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const deadline = document.getElementById('task-deadline').value;
    
    // Dans une vraie application, nous ajouterions la tâche à la base de données
    // Pour cette prévisualisation, nous fermerons simplement la fenêtre modale
    alert(`La tâche "${title}" serait ajoutée au quadrant sélectionné`);
    
    // Réinitialiser le formulaire et fermer la fenêtre modale
    taskForm.reset();
    closeModal();
  });
  
  // Implémentation améliorée du drag and drop
  const taskItems = document.querySelectorAll('.task-item');
  let draggedTask = null;
  
  taskItems.forEach(task => {
    // Rendre les tâches glissables
    task.setAttribute('draggable', 'true');
    
    task.addEventListener('dragstart', function(event) {
      draggedTask = task;
      task.classList.add('dragging');
      
      // Créer une image fantôme pour le drag and drop
      const ghostElement = task.cloneNode(true);
      ghostElement.style.opacity = '0.5';
      ghostElement.style.position = 'absolute';
      ghostElement.style.top = '-1000px';
      document.body.appendChild(ghostElement);
      event.dataTransfer.setDragImage(ghostElement, 20, 20);
      
      // Nettoyer l'élément fantôme après un court délai
      setTimeout(() => {
        document.body.removeChild(ghostElement);
      }, 0);
      
      event.dataTransfer.setData('text/plain', task.innerHTML);
      event.dataTransfer.effectAllowed = 'move';
    });
    
    task.addEventListener('dragend', function() {
      task.classList.remove('dragging');
      draggedTask = null;
      
      // Supprimer les indicateurs visuels de drop
      document.querySelectorAll('.task-list').forEach(list => {
        list.classList.remove('drag-over');
      });
    });
  });
  
  // Permettre le dépôt des tâches dans les quadrants
  const quadrants = document.querySelectorAll('.task-list');
  quadrants.forEach(quadrant => {
    // Indiquer visuellement que la zone peut recevoir un élément
    quadrant.addEventListener('dragenter', function(event) {
      event.preventDefault();
      if (draggedTask) {
        quadrant.classList.add('drag-over');
      }
    });
    
    quadrant.addEventListener('dragover', function(event) {
      event.preventDefault();
      if (draggedTask) {
        event.dataTransfer.dropEffect = 'move';
      }
    });
    
    quadrant.addEventListener('dragleave', function(event) {
      // Vérifier si on quitte réellement le quadrant et pas juste un enfant
      const rect = quadrant.getBoundingClientRect();
      const x = event.clientX;
      const y = event.clientY;
      
      if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
        quadrant.classList.remove('drag-over');
      }
    });
    
    quadrant.addEventListener('drop', function(event) {
      event.preventDefault();
      quadrant.classList.remove('drag-over');
      
      if (draggedTask) {
        // Vérifier si la tâche est déplacée vers un nouveau quadrant
        const sourceQuadrant = draggedTask.parentNode;
        
        if (sourceQuadrant !== quadrant) {
          // Déplacer la tâche vers le nouveau quadrant
          sourceQuadrant.removeChild(draggedTask);
          quadrant.appendChild(draggedTask);
          
          // Afficher un message de confirmation
          const quadrantTitle = quadrant.closest('.quadrant').querySelector('.quadrant-title h2').textContent;
          alert(`La tâche a été déplacée vers le quadrant "${quadrantTitle}"`);  
        }
      }
    });
  });
  
  // Fonctionnalité des cases à cocher des tâches
  const checkboxes = document.querySelectorAll('.task-checkbox');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const taskItem = this.closest('.task-item');
      const taskTitle = taskItem.querySelector('.task-title');
      
      if (this.checked) {
        taskTitle.style.textDecoration = 'line-through';
        taskTitle.style.opacity = '0.6';
      } else {
        taskTitle.style.textDecoration = 'none';
        taskTitle.style.opacity = '1';
      }
    });
  });
  
  // Fonctionnalité des boutons de menu des tâches
  const menuButtons = document.querySelectorAll('.task-menu-button');
  menuButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Dans une vraie application, nous afficherions un menu déroulant
      // Pour cette prévisualisation, nous afficherons simplement une alerte avec des options
      const options = confirm('Options: Modifier / Archiver / Supprimer\n\nAppuyez sur OK pour modifier ou Annuler pour fermer');
      if (options) {
        alert('La fenêtre modale de modification de tâche s\'ouvrirait ici');
      }
    });
  });
});
