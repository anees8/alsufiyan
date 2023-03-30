<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col cols="12">
          <b-card header="General">
            <b-container fluid>
              <b-row class="mb-3">
                <b-col>
                  <b-img
                    start
                    v-bind="{ width: 75, height: 75, class: 'm1' }"
                    rounded="circle"
                    src="/logo/logo.png"
                    alt="Center image"
                  ></b-img>
                </b-col>
              </b-row>
              <b-row class="mb-3">
                <b-col>
                  <b-img
                    start
                    v-bind="{ height: 75, class: 'm1' }"
                    rounded
                    src="/logo/slogo2.png"
                    alt="Center image"
                  ></b-img>
                </b-col>
              </b-row>
              <b-row class="mb-3">
                <b-form-textarea
                  id="textarea"
                  placeholder="Enter something..."
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script setup></script>
