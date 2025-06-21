const createClassForm = document.getElementById('createClassForm');
const liveClassesList = document.getElementById('liveClasses');

createClassForm.addEventListener('submit', async e => {
  e.preventDefault();

  const subjectInput = document.getElementById('subject');
  const subject = subjectInput.value.trim();
  if (!subject) return alert('Please enter a subject.');

  try {
    const response = await fetch('/classes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject }),
    });

    if (response.ok) {
      const newClass = await response.json();
      const li = document.createElement('li');
      li.innerHTML = `${newClass.subject} | <a href="/class/${newClass.roomId}">Join</a>`;
      liveClassesList.appendChild(li);
      subjectInput.value = '';
    } else {
      alert('Error creating class.');
    }
  } catch (err) {
    console.error(err);
    alert('Server error while creating class.');
  }
});
