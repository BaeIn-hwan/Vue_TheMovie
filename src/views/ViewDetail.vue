<template>
	<div class="movie-detail">
		<template v-if="loading.viewDetail == true">
			<section class="movie-detail__top">
				<figure class="movie-detail__thumb">
					<img :src="`${$store.state.imgURL}/w300${viewDetail.poster_path}`" alt="">
				</figure>

				<div class="movie-detail__detail">
					<h2 class="movie-detail__title">
						<span>{{viewDetail.title || viewDetail.name}}</span>
					</h2>

					<span class="movie-detail__making"></span>

					<div class="movie-detail__genres">
						<ul class="movie-detail__genres__box">
							<template v-if="viewDetail.genres && viewDetail.genres.length">
								<li class="movie-detail__genres__list" v-for="(word, index) in viewDetail.genres" :key="index">
									<a href="#" @click.prevent>{{word.name}}</a>
								</li>
							</template>
						</ul>
					</div>

					<p class="movie-detail__overview">{{viewDetail.overview}}</p>
				</div>
			</section>
		</template>
	</div>
</template>

<script>
export default {
	name: "MovieDetail",
	data() {
		return {
			viewInfo: {
				id: 0,
				type: 'movie'
			},
			loading: {
				viewDetail: false,
			},
			parameters: {
				viewPrams: {
					language: "ko-KR",
				}
			},
			viewDetail: null,
		}
	},
	computed: {
	
	},
	created() {		
		this.viewInfo = this.$route.params;
		this.requestViewDetail();
	},
	methods: {
		async requestViewDetail() {
			try {
				const response = await this.$store.dispatch("requestMethod", {
					method: "GET",
					url: `/${this.viewInfo.type}/${this.viewInfo.id}`,
					data: this.parameters.viewPrams
				});

				console.log("response", response.data)

				if (response && response.data) {
					this.loading.viewDetail = true;
					this.viewDetail = response.data;
				// 	this.loading.itemListLoading = true;
				// 	this.itemList = response.data.results;
				// 	this.paginations.total = response.data.total_results;
				}
				else {
					this.loading.viewDetail = false;
					this.viewsDetail = {};
				}

				// this.$nextTick(function() {
				// 	this.$refs.pagination.pageInit();
				// });
			}
			catch(e) {
				this.loading.viewDetail = false;
				console.error("error", e);
			}
		}
	},
}
</script>

<style lang="scss" scoped>
.movie-detail {
	max-width: 1280px;
	margin: 0 auto;
	padding: 25px 20px 0;

	&__top {
		font-size: 0;
	}

	&__thumb {
		display: inline-block;
		overflow: hidden;
		position: relative;
		width: 300px;
		height: 450px;
		vertical-align: top;

		img {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			width: 100%;
			height: auto;
			margin: 0;
		}
	}

	&__detail {
		display: inline-block;
		width: calc(100% - 350px);
		margin-left: 50px;
		vertical-align: top;
	}

	&__title {
		span {
			display: inline-block;
			font: {
				size: 28px;
				weight: 600;
			};
			color: #FFF;
			line-height: 38px;
		}
	}

	&__genres {
		margin-top: 25px;

		&__box {
			margin: -10px;
		}

		&__list {
			display: inline-block;
			margin: 10px;
			vertical-align: top;

			a {
				display: block;
				padding: 8px 15px;
				background: #FFF;
				border-radius: 15px;
				font-size: 14px;
				color: #000;
			}
		}
	}

	&__overview {
		margin-top: 35px;
		font-size: 16px;
		color: #FFF;
		line-height: 24px;
		word-break: keep-all;
		word-wrap: break-word;
	}
}
</style>