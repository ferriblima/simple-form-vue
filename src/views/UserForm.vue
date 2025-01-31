<template>
  <!-- Standard HTML form with method and action -->
  <form
    ref="formRef"
    method="POST"
    action="https://example.com/submitData" 
    @submit="onSubmit"
  >
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
      <!-- Pass a 'name' to the RatingControl so it gets included in form data -->
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
     * Called by Vue when the user submits the form.
     * If we do NOT call event.preventDefault(), 
     * the form will be submitted the "classic" way.
     */
    onSubmit(event) {
      // Validate or log the data here before letting the form submit
      this.validateUserName();

      // If the userName is invalid, prevent submission
      if (this.userNameValidationState === 'invalid') {
        alert('Please provide a valid name before submitting!');
        event.preventDefault();
        return;
      }

      // You can log the data for debugging
      const formData = this.collectFormData();
      console.log('Form data =>', formData);

      // If everything is valid, do NOT call event.preventDefault().
      // The browser will submit the form to `action="..."` automatically.
    },

    /**
     * Collects data from our reactive properties.
     * Note: This is just for your reference or console.log usage;
     * the actual submission is handled by the browser since 
     * we haven't called event.preventDefault().
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
     * A simple validation function for userName.
     */
    validateUserName() {
      this.userNameValidationState = 
        this.userName.trim() === '' ? 'invalid' : 'valid';
    }
  }
};
</script>

<style scoped>
/* 
  Scoped styles remain the same, or you can remove them
  if you're using global styles from global.css
*/
</style>
