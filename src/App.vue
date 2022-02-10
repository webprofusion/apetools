<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-success">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Ape Tools</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              to="/tools/imagegorilla"
              >Tools</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/about"
              >About</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<style >
/* from https://css-tricks.com/snippets/css/shake-css-keyframe-animation/ */
.ape:hover {
  animation: shake 0.8s cubic-bezier(0.36, 0.07, 0.19, 0.97) both infinite;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.sample-swatch {
  display: inline-block;
  height: 16px;
  width: 16px;
  border: 1px solid gainsboro;
  background-color: black;
}

/*file upload styles*/

input[type="file"] {
  border: 1px solid #6d6e6e9c;
  padding: 1em;
  background-color: #f9f9f9;
  margin: 1em;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}
/*end file upload styles*/
</style>