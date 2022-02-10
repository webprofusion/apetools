<template>
  <main class="container col-xxl-8 px-4 py-5">
    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div class="col-md-8">
        <div class="jumbotron">
          <img
            src="@/assets/logo.png"
            style="float: left; margin-right: 1em"
            class="rounded-circle ape"
          />
          <h1>Ape Tools</h1>
          <p class="lead">
            Don't Go Ape, Go Ape Tools.<br />
            Get apps done quicker.
          </p>
          <p>
            Create all the required sizes of Icons and Splashscreens for your
            app instantly for all major platforms
            <i title="iOS" class="fa fa-apple"></i>
            <i title="Windows Store" class="fa fa-windows"></i>
            <i title="Android" class="fa fa-android"></i>
            <i title="Web" class="fa fa-cloud"></i>.
          </p>
          <a href="#/tools/imagegorilla" class="btn btn-primary"
            >Generate Your Icons &amp; Splashscreens</a
          >
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div style="margin-top: 40px">
          <div class="well well-sm">
            <p>
              If you like this tool please share it with others:
              <a
                href="https://twitter.com/share"
                class="twitter-share-button"
                data-url="https://apetools.webprofusion.com"
                data-text="Check out Ape Tools, the quick way to generate all the icons and splash screens for your app:"
                data-via="webprofusion"
                >Share</a
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import "bootstrap/dist/css/bootstrap.min.css";
import { Options, Vue } from "vue-class-component";

@Options({
})
export default class Home extends Vue {}
</script>

<style scoped>

</style>