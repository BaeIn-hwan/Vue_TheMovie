<template>
	<section class="movie-detail">
		<h2 class="blind">영화 상세</h2>
		<div class="movie-detail__view">
			<figure class="movie-detail__thumb">
				<img :src="$store.state.imgURL +'/w500'+ movieDetail.poster_path" alt="">
			</figure>

			<div class="movie-detail__info">
				<h3 class="movie-detail__title">{{movieDetail.title}}</h3>
				<p class="movie-detail__desc">{{movieDetail.overview}}</p>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: "MovieDetail",
	data() {
		return {
			parameters: {
				movieID: "",
			},
			movieDetail: {},
		}
	},
	beforeCreate() {
		
	},
	mounted() {
		this.parameters.movieID = this.$route.params.id;
		this.$nextTick(function() {
			this.requestMovieDetail();
		})
	},
	methods: {
		async requestMovieDetail() {
			try {
				const response = await this.$store.dispatch("requestMethod", {
					method: "GET",
					url: `/movie/${this.parameters.movieID}`,
					data: {
						language: "KO"
					}
				});

				if (response && response.data) {
					console.log(response.data);
					this.movieDetail = response.data;
				}				
			}
			catch(e) {
				console.error("error", e);
			}
		}
	},
}
</script>

<style>

</style>