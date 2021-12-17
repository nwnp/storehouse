<template>
  <div>
    <h1>Bootstrap teset</h1>
    <b-row>
      <b-col>
        <h3>Left</h3>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">@</span>
          <input
            type="text"
            class="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>

        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Recipient's username"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <span class="input-group-text" id="basic-addon2">@example.com</span>
        </div>

        <label for="basic-url" class="form-label">Your vanity URL</label>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon3"
            >https://example.com/users/</span
          >
          <input
            type="text"
            class="form-control"
            id="basic-url"
            aria-describedby="basic-addon3"
          />
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">$</span>
          <input
            type="text"
            class="form-control"
            aria-label="Amount (to the nearest dollar)"
          />
          <span class="input-group-text">.00</span>
        </div>

        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Username"
            aria-label="Username"
          />
          <span class="input-group-text">@</span>
          <input
            type="text"
            class="form-control"
            placeholder="Server"
            aria-label="Server"
          />
        </div>

        <div class="input-group">
          <span class="input-group-text">With textarea</span>
          <textarea class="form-control" aria-label="With textarea"></textarea>
        </div>
      </b-col>
      <b-col style="text-align: Left">
        <h3>Center</h3>
        <div>
          <h4>button</h4>
          <b-button>Button</b-button>
          <b-button variant="danger">Button</b-button>
          <b-button variant="success">Button</b-button>
          <b-button variant="outline-primary">Button</b-button>
        </div>
        <div>
          <h4>input text</h4>
          <b-form-input placeholder="Enter your name"></b-form-input>
        </div>
        <div>
          <h4>checkbox</h4>
          <b-form-checkbox
            id="checkbox-1"
            name="checkbox-1"
            value="accepted"
            unchecked-value="not_accepted"
          >
            I accept the terms and use
          </b-form-checkbox>
        </div>
        <div>
          <h4>radio</h4>
          <b-form-group>
            <b-form-radio name="some-radios" value="A">Option A</b-form-radio>
            <b-form-radio name="some-radios" value="B">Option B</b-form-radio>
          </b-form-group>
        </div>
        <div>
          <h4>select</h4>
          <b-form-select v-model="selected" :options="options"></b-form-select>
        </div>
        <div>
          <h4>textarea</h4>
          <b-form-textarea
            id="textarea"
            placeholder="Enter something..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </div>
        <div>
          <h4>input group</h4>
          <b-input-group prepend="Username" class="mt-3">
            <b-form-input></b-form-input>
            <b-input-group-append>
              <b-button variant="outline-success">Button</b-button>
              <b-button variant="info">Button</b-button>
            </b-input-group-append>
          </b-input-group>
        </div>
        <div>
          <h4>table</h4>
          <b-table striped hover :items="items"></b-table>
        </div>
      </b-col>
      <b-col>
        <h3>Right</h3>
        <label for="customRange1" class="form-label">Example range</label>
        <input type="range" class="form-range" id="customRange1" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      select: null,
      options: [
        { value: null, text: "Please select an option" },
        { value: "a", text: "This is First option" },
        { value: "b", text: "Selected Option" },
        { value: { C: "3PO" }, text: "This is an option with object value" },
        { value: "d", text: "This one is disabled", disabled: true },
      ],
      items: [
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 38, first_name: "Jami", last_name: "Carney" },
      ],
    };
  },
};
</script>

<style scoped>
div h4 {
  margin-top: 20px;
}
</style>
