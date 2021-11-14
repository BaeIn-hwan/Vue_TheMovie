<template>
	<header class="header" id="header">
      <div class="header__inner">
        <h1 class="header__logo">
          <router-link to="/" class="header__logo__link">
            <img src="@/assets/images/header/logo_header_movie.svg" alt="" class="header__logo__img">
          </router-link>
        </h1>

        <nav class="gnb">
          <ul class="gnb__box">
            <li class="gnb__list">
							<router-link to="/MovieList" class="gnb__link">MOVIE</router-link>
            </li>

            <li class="gnb__list">
							<router-link to="/TV" class="gnb__link">TV</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
</template>

<script>
export default {
	data() {
		return {
			
		}
	}
}
</script>

<style>

</style>