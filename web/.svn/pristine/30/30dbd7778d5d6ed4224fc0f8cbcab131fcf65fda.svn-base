<template>
  <label class="mint-checklist-label" style="width: 50%; padding: 10px; margin: 0; display: inline-block; box-sizing: border-box">
        <span class="mint-radio">
          <input
            class="mint-radio-input"
            type="checkbox"
            :value="person.ptId.value"
            :disabled="disabled"
            @change="change($event)"
          >
          <span class="mint-radio-core"></span>
        </span>
    <span class="mint-radio-label" v-text="person.ptName" :class="{disable: disabled}"></span>
  </label>
<!--<mt-checklist></mt-checklist>-->
</template>

<script>
    export default {
      props:['person', 'age', 'sex'],
      computed: {
        disabled() {
          let agesValue = this.person.agesValue;
          let genders = this.person.genders;
          if(!agesValue) return true;
          if(!genders) return true;
          const genderArray = genders.split(",");
          var sexSuit = false;
          var ageSuit = false;
          for (let i = 0; i < genderArray.length; i++) {
            const gender = genderArray[i];
            if(gender == this.sex) {
              sexSuit = true;
              break;
            }
          }
          const ageArray = agesValue.split(",");
          for (let i = 0; i < ageArray.length; i++) {
            const ageSection = ageArray[i];
            let start = ageSection.indexOf("<=");
            let end = ageSection.lastIndexOf("<");
            let minAge = ageSection.substring(0, start);
            let maxAge = ageSection.substring(end + 1, ageSection.length);
            if(this.age >= minAge && this.age < maxAge) {
              ageSuit = true;
              break;
            }
          }
          return !(sexSuit && ageSuit);
        }
      },
      methods: {
        change(event) {
          this.$emit("checkedChange", event);
        }
      }
    }
</script>

<style scoped>
  .disable {
    color: gray;
  }
</style>
