import './style.css'
import "@ui5/webcomponents-icons/dist/AllIcons.js";
import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Switch.js";
import "@ui5/webcomponents/dist/SegmentedButton.js";
import "@ui5/webcomponents/dist/ToggleButton.js";
import "@ui5/webcomponents-fiori/dist/Wizard.js";
import "@ui5/webcomponents-fiori/dist/WizardStep.js";

const app = document.querySelector('#app');

app.innerHTML = `
<ui5-wizard id="wiz">
     <ui5-wizard-step icon="product" title-text="Product type" selected>
          <ui5-title>1. Product Type</ui5-title>

          <!-- Move to step 2 -->
          <ui5-button id="toStep2">Step 2</ui5-button>
     </ui5-wizard-step>

     <ui5-wizard-step icon="hint" title-text="Product Information" disabled>
          <ui5-title>2. Product Information</ui5-title>

          <div>
               <ui5-label>5 years guarantee included</ui5-label>
               <ui5-switch id="sw"></ui5-switch>
          </div>

          <!-- Move to step 3 -->
          <ui5-button id="toStep3" hidden>Step 3</ui5-button>
     </ui5-wizard-step>

     <ui5-wizard-step icon="action-settings" title-text="Options" disabled>
          <ui5-title>3. Options</ui5-title><br>

          <ui5-segmented-button id="sb">
               <ui5-toggle-button icon="employee" pressed>Small</ui5-toggle-button>
               <ui5-toggle-button>Medium</ui5-toggle-button>
               <ui5-toggle-button>Large</ui5-toggle-button>
          </ui5-segmented-button>

          <!-- Move to step 4 -->
          <ui5-button id="toStep4" hidden>Step 4</ui5-button>
     </ui5-wizard-step>

     <ui5-wizard-step icon="lead" title-text="Pricing" disabled>
          <ui5-title>4. Pricing</ui5-title><br>
          <ui5-button id="finalize">Finalize</ui5-button>
     </ui5-wizard-step>
</ui5-wizard>
`

const wizard = document.querySelector('#wiz');
const toStep2 = document.querySelector('#toStep2');
const toStep3 = document.querySelector('#toStep3');
const sw = document.querySelector('#sw');

// The code shows how the users can manipulte the ui5-wizard-step API (selected and disabled)
// to go through the wizard steps.
const moveToStep = idx => {
    const step = getStep(idx); // where "step" is an instance of ui5-wizard-step
    step.selected = true;
    step.disabled = false;
}
const getStep = idx => {
    return Array.from(wizard.children)[idx];
}
const deselectAllSteps = () => {
    Array.from(wizard.children).forEach(function(step) {
        step.selected = false;
    });
}

// Move to Step 2
toStep2.addEventListener("click", function () {
    deselectAllSteps();
    moveToStep(1);
});

// Move to Step 3
toStep3.addEventListener("click", function () {
    deselectAllSteps();
    moveToStep(2);
});

// Show the "step to 3" button after "validation"
sw.addEventListener("change", function () {
    toStep3.removeAttribute("hidden");
});
