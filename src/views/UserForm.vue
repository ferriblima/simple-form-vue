<template>
  <!-- Standard HTML form -->
  <form @submit.prevent="handleSubmit">
    <!-- USER NAME -->
    <div
      class="form-control"
      :class="{ invalid: userNameValidationState === 'invalid' }"
    >
      <label for="user-name">Your Name</label>
      <input
        id="user-name"
        name="userName"
        type="text"
        v-model="userName"
        @blur="validateUserName"
        placeholder="Enter your name"
      />
      <p v-if="userNameValidationState === 'invalid'">
        Please enter a valid name!
      </p>
    </div>

    <!-- AGE -->
    <div class="form-control">
      <label for="age">Your Age (Years)</label>
      <input
        id="age"
        name="userAge"
        type="number"
        v-model.number="userAge"
        placeholder="e.g. 30"
        min="0"
      />
    </div>

    <!-- REFERRER -->
    <div class="form-control">
      <label for="referrer">How did you hear about us?</label>
      <select
        id="referrer"
        name="referrer"
        v-model="referrer"
      >
        <option value="google">Google</option>
        <option value="wom">Word of mouth</option>
        <option value="newspaper">Newspaper</option>
      </select>
    </div>

    <!-- INTERESTS -->
    <div class="form-control">
      <h2>What are you interested in?</h2>

      <div class="inline-checkbox">
        <div class="label-container">
          <label for="interest-news">News</label>
        </div>
        <div class="checkbox-container">
          <input
            id="interest-news"
            name="interest"
            type="checkbox"
            value="news"
            v-model="interest"
          />
        </div>
      </div>

      <div class="inline-checkbox">
        <div class="label-container">
          <label for="interest-tutorials">Tutorials</label>
        </div>
        <div class="checkbox-container">
          <input
            id="interest-tutorials"
            name="interest"
            type="checkbox"
            value="tutorials"
            v-model="interest"
          />
        </div>
      </div>

      <div class="inline-checkbox">
        <div class="label-container">
          <label for="interest-nothing">Nothing</label>
        </div>
        <div class="checkbox-container">
          <input
            id="interest-nothing"
            name="interest"
            type="checkbox"
            value="nothing"
            v-model="interest"
          />
        </div>
      </div>
    </div>

    <!-- HOW -->
    <div class="form-control">
      <h2>How do you learn?</h2>

      <div class="inline-checkbox">
        <div class="label-container">
          <label for="how-video">Video Courses</label>
        </div>
        <div class="checkbox-container">
          <input
            id="how-video"
            name="how"
            type="radio"
            value="video"
            v-model="how"
          />
        </div>
      </div>

      <div class="inline-checkbox">
        <div class="label-container">
          <label for="how-blogs">Blogs</label>
        </div>
        <div class="checkbox-container">
          <input
            id="how-blogs"
            name="how"
            type="radio"
            value="blogs"
            v-model="how"
          />
        </div>
      </div>

      <div class="inline-checkbox">
        <div class="label-container">
          <label for="how-other">Other</label>
        </div>
        <div class="checkbox-container">
          <input
            id="how-other"
            name="how"
            type="radio"
            value="other"
            v-model="how"
          />
        </div>
      </div>
    </div>

    <!-- RATING -->
    <div class="form-control">
      <h2>Rate Your Experience</h2>
      <!-- The custom Rating Control component -->
      <rating-control
        name="rating"
        v-model="rating"
      />
    </div>

    <!-- CONFIRM (TERMS) -->
    <div class="form-control">
      <div class="inline-checkbox">
        <div class="label-container">
          <label for="confirm-terms">Agree to terms of use?</label>
        </div>
        <div class="checkbox-container">
          <input
            type="checkbox"
            id="confirm-terms"
            name="confirm"
            v-model="confirm"
          />
        </div>
      </div>
    </div>

    <div class="form-actions">
      <button type="submit">Save Data</button>
    </div>
  </form>
</template>

<script>
import RatingControl from '../components/RatingControl.vue';

export default {
  name: 'UserForm',
  components: { RatingControl },

  data() {
    return {
      userName: '',
      userAge: null,
      referrer: 'wom',
      interest: [],
      how: null,
      confirm: false,
      rating: null,
      userNameValidationState: 'pending'
    };
  },

  methods: {
    /**
     * Handle the form submission event.
     * We're using `@submit.prevent="handleSubmit"` in the template,
     * so the default browser action won't occur automatically.
     */
    handleSubmit() {
      // Validate the userName field
      this.validateUserName();

      // If userName is invalid, we could show an alert or simply stop.
      if (this.userNameValidationState === 'invalid') {
        alert('Please provide a valid name before submitting!');
        return;
      }

      // Collect all form data
      const formData = this.collectFormData();
      console.log('Form data =>', formData);

      // Example: If you have an API, you could call `this.sendToAPI(formData)`.
      // For now, we just log it and optionally reset the form.
      // this.resetForm();
    },

    /**
     * Gathers all relevant data from our component state
     * to be sent or logged.
     */
    collectFormData() {
      return {
        userName: this.userName,
        userAge: this.userAge,
        referrer: this.referrer,
        interest: this.interest,
        how: this.how,
        confirm: this.confirm,
        rating: this.rating
      };
    },

    /**
     * Simple validation function for userName.
     * You can add more advanced checks here if needed.
     */
    validateUserName() {
      this.userNameValidationState =
        this.userName.trim() === '' ? 'invalid' : 'valid';
    },

    /**
     * (Optional) Reset the form data after successful submission.
     */
    resetForm() {
      this.userName = '';
      this.userAge = null;
      this.referrer = 'wom';
      this.interest = [];
      this.how = null;
      this.confirm = false;
      this.rating = null;
      this.userNameValidationState = 'pending';
    },

    /**
     * (Optional) Example: Send data to an API endpoint
     */
    async sendToAPI(formData) {
      try {
        const response = await fetch('https://api.example.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (!response.ok) {
          throw new Error(`API request failed: ${response.statusText}`);
        }
        const result = await response.json();
        console.log('API response:', result);
      } catch (error) {
        console.error('Error sending data to API:', error);
      }
    }
  }
};
</script>

