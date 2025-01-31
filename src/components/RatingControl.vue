<template>
  <div class="rating-control">
    <ul>
      <!-- Loop through ratingOptions to display stars -->
      <li
        v-for="option in ratingOptions"
        :key="option.value"
        :class="{ active: option.score <= currentHighlight }"
      >
        <button
          type="button"
          @click="emitValue(option.value)"
          @mouseenter="setHover(option.score)"
          @mouseleave="clearHover"
          :aria-label="option.label"
          :aria-pressed="modelValue === option.value"
        >
          <!-- Unicode star icon; alternatively, use SVG or icon libraries -->
          <span class="star">&#9733;</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RatingControl',

  props: {
    modelValue: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: 'rating',
    },
  },

  emits: ['update:modelValue'],

  data() {
    return {
      ratingOptions: [
        { value: 'poor', label: 'Poor', score: 1 },
        { value: 'average', label: 'Average', score: 2 },
        { value: 'great', label: 'Great', score: 3 },
      ],
      hoverValue: 0, // Tracks the current hovered star
    };
  },

  computed: {
    /**
     * Determines the current highlight score based on hover or selection.
     * If hovering, use hoverValue; otherwise, use the score of the selected rating.
     */
    currentHighlight() {
      return this.hoverValue || this.getScore(this.modelValue);
    },
  },

  methods: {
    /**
     * Emits the selected rating value to the parent component.
     */
    emitValue(rating) {
      this.$emit('update:modelValue', rating);
    },

    /**
     * Sets the hoverValue when a star is hovered.
     * @param {Number} score - The score of the hovered star.
     */
    setHover(score) {
      this.hoverValue = score;
    },

    /**
     * Clears the hoverValue when the mouse leaves a star.
     */
    clearHover() {
      this.hoverValue = 0;
    },

    /**
     * Retrieves the numerical score associated with a rating value.
     * @param {String} ratingValue - The value of the rating (e.g., 'poor').
     * @returns {Number} - The score corresponding to the ratingValue.
     */
    getScore(ratingValue) {
      const option = this.ratingOptions.find(opt => opt.value === ratingValue);
      return option ? option.score : 0;
    },
  },
};
</script>

<style scoped>
.rating-control ul {
  list-style: none;
  display: flex;
  justify-content: center; /* Center the stars horizontally */
  padding: 0;
  margin: 0.5rem 0;
}

.rating-control li {
  margin: 0 0.5rem;
}

.rating-control button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  outline: none;
}

.rating-control .star {
  font-size: 2rem; /* Increase star size */
  color: #ccc;      /* Default star color */
  transition: color 0.3s, transform 0.3s;
}

.rating-control li.active .star {
  color: #ffcc00; /* Highlight color for active stars */
}

.rating-control li:hover .star {
  transform: scale(1.2); /* Slightly enlarge on hover */
}

.rating-control button:focus .star {
  outline: 2px solid #0076bb; /* Accessibility: focus outline */
  outline-offset: 4px;
}
</style>
