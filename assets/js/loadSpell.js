// Get the div to update
const spellDiv = document.getElementById("spell-div");
// Get the main element
const mainEl = document.querySelector("main");

const createSpellCard = (text) => {
  // Clear the old text content
  spellDiv.textContent = "";

  // Parse markdown
  const spellName = text.match(/###\s*([^#\n]+)\n/)[1];
  const spellType = text.match(/\*([^*]+)\*/)[1];
  const castingTime = text.match(/\*\*Casting Time:\*\*\s*([^\n]+)\n/)[1];
  const range = text.match(/\*\*Range:\*\*\s*([^\n]+)\n/)[1];
  const components = text.match(/\*\*Components:\*\*\s*([^\n]+)\n/)[1];
  const duration = text.match(/\*\*Duration:\*\*\s*([^\n]+)\n/)[1];
  const description = text.match(/\*\*Duration:\*\* ([^\n]+)\n\n([^]+)/)[2];
  
  // Utility function for creating fields
  const createField = (field, value) => {
	const div = document.createElement('div');

	const label = document.createElement('span');
	label.classList.add('spellLabel');
	label.textContent = field;

	const val = document.createElement('span');
	val.textContent = `${value}`;

	div.append(label, value);
	return div;
  }

  const formatDescription = (text) => {
	return text.replace(/\*\*\*([^*]+)\*\*\*\./g, '<h5>$1</h5>');
  }

  // Make the card
  const card = document.createElement("div");
  card.classList.add("spellCard");

  const nameSchool = document.createElement("div");
  nameSchool.classList.add('cardHeading');

  const spellTitle = document.createElement("h2");
  spellTitle.textContent = spellName;

  const spellLevelSchool = document.createElement('span');
  spellLevelSchool.classList.add('levelSchool');
  spellLevelSchool.textContent = spellType;

  nameSchool.append(spellTitle, spellLevelSchool);
  
  const timeRange = document.createElement('div');
  timeRange.classList.add('timeRange');

  const timeField = createField("Casting Time: ", castingTime);
  const rangeField = createField("Range: ", range);

  timeRange.append(timeField, rangeField);

  const compDuration = document.createElement('div');
  compDuration.classList.add('compDuration');

  const compField = createField("Components: ", components);
  const durationField = createField("Duration: ", duration);

  compDuration.append(compField, durationField);

  const linebreak = document.createElement('br');

  const descriptionDiv = document.createElement('div');
  descriptionDiv.innerHTML = formatDescription(description);
  

  card.append(nameSchool, timeRange, compDuration, linebreak, descriptionDiv);

  spellDiv.append(card);
};

const fetchSpell = async (name) => {
  try {
    const response = await fetch(`/docs/spells/${name}.md`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const markdownText = await response.text();
    createSpellCard(markdownText);
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

mainEl.addEventListener("click", (event) => {
  if (event.target && event.target.tagName == "BUTTON") {
    const name = event.target.textContent;
    fetchSpell(name);
  }
});
