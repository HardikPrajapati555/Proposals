document.addEventListener('DOMContentLoaded', function () {
    // Open the modal
    document.getElementById('openFormBtn2').addEventListener('click', function (event) {
      event.preventDefault();
      document.getElementById('proposalModal').style.display = 'block';
    });
  
    // Close the modal
    document.getElementsByClassName('close')[0].addEventListener('click', function () {
      document.getElementById('proposalModal').style.display = 'none';
    });
  
    window.addEventListener('click', function (event) {
      if (event.target == document.getElementById('proposalModal')) {
        document.getElementById('proposalModal').style.display = 'none';
      }
    });
  
    // Handle file upload
    document.getElementById("uploadButton").addEventListener("click", function () {
      document.getElementById("fileInput").click();
    });
  
    document.getElementById("fileInput").addEventListener("change", function (e) {
      const file = e.target.files[0];
      const previewContainer = document.getElementById("previewContainer");
      const previewImage = document.getElementById("previewImage");
      const deleteButton = document.getElementById("deleteButton");
  
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          previewImage.src = e.target.result;
          previewContainer.style.display = "block";
        };
        reader.readAsDataURL(file);
        deleteButton.style.display = 'block';
      } else {
        deleteButton.style.display = 'none';
        previewContainer.style.display = 'none';
      }
    });
  
    document.getElementById("deleteButton").addEventListener("click", function () {
      document.getElementById("fileInput").value = '';
      document.getElementById("previewContainer").style.display = 'none';
      document.getElementById("previewImage").src = '';
    });
  
    // Variables to store data from Steps 1 and 2
    let step1Data = {};
    let step2Data = {};
  
    // Navigate to Step 2
    document.getElementById('nextStepBtn').addEventListener('click', function () {
      step1Data = {
        clientName: document.querySelector('#proposalFormStep1 input[name="clientName"]').value,
        startDate: document.querySelector('#proposalFormStep1 input[name="startDate"]').value,
        duration: document.querySelector('#proposalFormStep1 input[name="duration"]').value,
        slotDuration: document.querySelector('#proposalFormStep1 #seconds').value,
        cities: document.querySelector('#proposalFormStep1 select[name="cities"]').value,
        clientType: document.querySelector('#proposalFormStep1 select[name="clientType"]').value,
        propertyType: document.querySelector('#proposalFormStep1 select[name="propertyType"]').value,
        plan: document.querySelector('#proposalFormStep1 select[name="plan"]').value,
        advertiserTag: document.querySelector('#proposalFormStep1 input[name="advertiserTag"]').value,
        popRequired: document.querySelector('#proposalFormStep1 input[name="popRequired"]').checked,
        geoTaggingRequired: document.querySelector('#proposalFormStep1 input[name="geoTaggingRequired"]').checked
      };
  
      // Hide Step 1, show Step 2
      document.getElementById('formStep1').style.display = 'none';
      document.getElementById('formStep2').style.display = 'block';
    });
  
    // Navigate back to Step 1
    document.getElementById('goBackBtn').addEventListener('click', function () {
      // Clear Step 2 data
      step2Data = {};
  
      // Hide Step 2, show Step 1
      document.getElementById('formStep2').style.display = 'none';
      document.getElementById('formStep1').style.display = 'block';
    });
  
    // Handle Step 2 submission and move to Step 3
    document.getElementById('nextBtnStep2').addEventListener('click', function () {
      step2Data = {
        fileName: document.querySelector('#formStep2 input[name="fileName"]').value,
        creativeInstruction: document.querySelector('#formStep2 input[name="creativeInstruction"]').value,
      };
  
      // Populate Step 3 with data from Step 1 and Step 2
      document.getElementById('reviewClientName').textContent = step1Data.clientName;
      document.getElementById('reviewStartDate').textContent = step1Data.startDate;
      document.getElementById('reviewDuration').textContent = step1Data.duration;
      document.getElementById('reviewSlotDuration').textContent = step1Data.slotDuration + ' sec';
      document.getElementById('reviewCities').textContent = step1Data.cities;
      document.getElementById('reviewClientType').textContent = step1Data.clientType;
      document.getElementById('reviewPropertyType').textContent = step1Data.propertyType;
      document.getElementById('reviewPlan').textContent = step1Data.plan;
      document.getElementById('reviewAdvertisierTag').textContent = step1Data.advertiserTag;
      document.getElementById('reviewPopRequired').textContent = step1Data.popRequired ? 'Yes' : 'No';
      document.getElementById('reviewGeoTagging').textContent = step1Data.geoTaggingRequired ? 'Yes' : 'No';
      document.getElementById('reviewFileName').textContent = step2Data.fileName;
      document.getElementById('reviewCreativeInstruction').textContent = step2Data.creativeInstruction;
  
      // Hide Step 2, show Step 3
      document.getElementById('formStep2').style.display = 'none';
      document.getElementById('formStep3').style.display = 'block';
    });
  
    // Handle form submission
    document.getElementById('submitProposalBtn').addEventListener('click', function () {
        const proposalData = {
          step1Data: step1Data,
          step2Data: step2Data
        };
      
        fetch('/submitProposal', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(proposalData),
        })
        .then(response => response.text())
        .then(data => {
          console.log('Proposal data saved:', data);
          alert('Proposal data saved successfully!');
          // Reset form steps
          document.getElementById('proposalModal').style.display = 'none';
          document.getElementById('formStep1').style.display = 'block';
          document.getElementById('formStep2').style.display = 'none';
          document.getElementById('formStep3').style.display = 'none';
        })
        .catch(error => {
          console.error('Error saving proposal:', error);
          alert('Error saving proposal data.');
        });
      });
      
  });
  


  ///////////////
      // JavaScript to handle the Edit button click
      document.getElementById('editProposalBtn').addEventListener('click', function() {
        document.getElementById('formStep3').style.display = 'none';
        document.getElementById('formStep1').style.display = 'block';
        // document.getElementById('formStep2').style.display = 'block';
    });


  

    

    ////////////////////


    document.addEventListener('DOMContentLoaded', () => {
      const submittedButtons = document.querySelectorAll('.submitted-button');
      const discardButtons = document.querySelectorAll('.discard-button');

      submittedButtons.forEach(button => {
          button.addEventListener('click', () => {
              const proposalId = button.getAttribute('data-id');
              window.location.href = `/summary/${proposalId}`;
          });
      });

      discardButtons.forEach(button => {
          button.addEventListener('click', () => {
              const proposalId = button.getAttribute('data-id');
              // Handle discard action, e.g., send a request to the server to delete the proposal
              fetch(`/discard/${proposalId}`, { method: 'DELETE' })
                  .then(response => {
                      if (response.ok) {
                          button.closest('tr').remove();
                      }
                  });
          });
      });
  });



  function showDraftTable() {
    // Hide all tables with class 'table-container'
    var tables = document.getElementsByClassName('table-container');
    for (var i = 0; i < tables.length; i++) {
        tables[i].style.display = 'none';
    }
    
    // Show the specific table you want
    var draftTable = document.querySelector('.table-container');
    draftTable.style.display = 'block';
}



//soft delete
    document.querySelector('.btn33').addEventListener('click', function() {
        document.getElementById('main-proposals-table').style.display = 'none';
        document.getElementById('deleted-proposals-table').style.display = 'block';
    });





document.addEventListener('DOMContentLoaded', () => {
  const submitButtons = document.querySelectorAll('.submitted-button');
  const modal = document.getElementById('editModal');
  const span = document.getElementsByClassName('close')[0];
  const form = document.getElementById('editForm');
  let currentRow;

  submitButtons.forEach(button => {
      button.addEventListener('click', (event) => {
          const button = event.target;
          currentRow = button.closest('tr');

          // Populate form with current row data
          form.proposalId.value = button.dataset.id;
          form.clientName.value = currentRow.cells[0].innerText;
          form.slotDuration.value = currentRow.cells[1].innerText;
          form.cities.value = currentRow.cells[2].innerText;

          // Open modal
          modal.style.display = 'block';
      });
  });

  span.onclick = function() {
      modal.style.display = 'none';
  }

  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = 'none';
      }
  }

  form.onsubmit = async function(event) {
      event.preventDefault();

      // Update row data in the database
      const response = await fetch('/updateProposal', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              id: form.proposalId.value,
              clientName: form.clientName.value,
              slotDuration: form.slotDuration.value,
              cities: form.cities.value
          })
      });

      if (response.ok) {
          // Update row data in the table
          currentRow.cells[0].innerText = form.clientName.value;
          currentRow.cells[1].innerText = form.slotDuration.value;
          currentRow.cells[2].innerText = form.cities.value;

          // Move the row to the pending activation table
          const pendingActivationTableBody = document.getElementById('pending-activation-body');
          pendingActivationTableBody.appendChild(currentRow);

          // Change the ACTION cell to indicate pending activation
          const actionCell = currentRow.cells[3];
          actionCell.innerHTML = '<button class="btn31" style="margin-left: 10px;">Pending Activation</button>';

          // Close modal
          modal.style.display = 'none';
      } else {
          alert('Failed to update the proposal');
      }
  }
});

function showPendingActivationTable() {
  document.getElementById('main-proposals-table').style.display = 'none';
  document.getElementById('pending-activation-table').style.display = 'block';
}
