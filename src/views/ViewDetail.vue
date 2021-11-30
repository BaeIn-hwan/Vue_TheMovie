<template>
	<div class="movie-detail">
		<section class="movie__section movie-detail__section">
			<template v-if="loading.viewDetail == true">
				<section class="movie-detail__top">
					<figure class="movie-detail__thumb">
						<img :src="`${$store.state.imgURL}/w300_and_h450_bestv2${viewDetail.poster_path}`" alt="">
					</figure>

					<div class="movie-detail__detail">
						<h2 class="movie-detail__title">
							<span>{{viewDetail.title || viewDetail.name}}({{getYear}})</span>
						</h2>

						<div class="movie-detail__info">
							<span class="movie-detail__countries"></span>
							<ul class="movie-detail__genres__box">
								<template v-if="viewDetail.genres && viewDetail.genres.length">
									<li class="movie-detail__genres__list" v-for="(word, index) in viewDetail.genres" :key="index">
										<a href="#" @click.prevent>{{word.name}}<template v-if="index != viewDetail.genres.length - 1">,</template></a>
									</li>
								</template>
							</ul>
						</div>

						<p class="movie-detail__overview">{{viewDetail.overview}}</p>
					</div>
				</section>
			</template>
		</section>

		<template v-if="loading.recommendation == true">
			<section class="movie__section recommendation__section">
				<div class="movie__header">
					<h2 class="movie__title">
						<span>RECOMMENDATIONS</span>
					</h2>
				</div>

				<div class="recommendation__wrapper">
					<ul class="recommendation__box">
						<template v-if="recommendationList && recommendationList.length">
							<li class="recommendation__list" v-for="(recommendation, index) in recommendationList" :key="index">
								<a href="#" class="recommendation__link">
									<figure class="recommendation__img">
										<img :alt="recommendation.title || recommendation.name" v-lazy="`${$store.state.imgURL}/w300_and_h450_face${recommendation.poster_path}`">
									</figure>

									<div class="recommendation__info">
										<span class="recommendation__info__title">{{recommendation.title || recommendation.name}}</span>
										<p class="recommendation__info__desc">{{recommendation.overview}}</p>
									</div>
								</a>
							</li>
						</template>

						<template v-else>
							<li>리스트가 없습니다.</li>
						</template>
					</ul>
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
				credits: false,
				recommendation: false,
			},
			parameters: {
				viewParams: {
					language: "ko-KR",
				},
				creditParams: {
					language: "ko-KR",
				},
				recommendationParams: {
					language: "ko-KR",
					page: 2,
				}
			},
			viewDetail: null,
			creditsList: null,
			recommendationList: null,
		}
	},
	computed: {
		getYear() {
			const date = this.viewDetail.release_date || this.viewDetail.first_air_date;
			return date.split("-")[0]
		}
	},
	created() {
		this.viewInfo = this.$route.params;
		this.requestViewDetail();
		this.requestCredits();
		this.requestRecommendations();
	},
	methods: {
		async requestViewDetail() {
			try {
				const response = await this.$store.dispatch("requestMethod", {
					method: "GET",
					url: `/${this.viewInfo.type}/${this.viewInfo.id}`,
					data: this.parameters.viewParams
				});

				console.log("requestViewDetail", response.data)
				if (response && response.data) {
					this.loading.viewDetail = true;
					this.viewDetail = response.data;
				}
				else {
					this.viewsDetail = {};
				}
			}
			catch(e) {
				this.loading.viewDetail = 'error';
				console.error("error", e);
			}
		},
		async requestCredits() {
			try {
				const response = await this.$store.dispatch("requestMethod", {
					method: "GET",
					url: `/${this.viewInfo.type}/${this.viewInfo.id}/credits`,
					data: this.parameters.creditParams
				});

				console.log("requestCredits", response.data)

				if (response && response.data) {
					this.loading.credits = true;
					this.creditsList = response.data;
				}
				else {
					this.creditsList = {};
				}
			}
			catch(e) {
				this.loading.credits = 'error';
				console.error("error", e);
			}
		},
		async requestRecommendations() {
			try {
				const response = await this.$store.dispatch("requestMethod", {
					method: "GET",
					url: `/${this.viewInfo.type}/${this.viewInfo.id}/recommendations`,
					data: this.parameters.creditParams
				});

				console.log("requestRecommendations", response.data)

				if (response && response.data && response.data.results) {
					this.loading.recommendation = true;
					this.recommendationList = response.data.results;
				}
				else {
					this.recommendationList = [];
				}
			}
			catch(e) {
				this.loading.recommendation = 'error';
				console.error("error", e);
			}
		}
	},
}
</script>

<style lang="scss" scoped>
.movie-detail {
	&__section {
		max-width: 1280px;
		margin: 0 auto;
		padding: 30px 20px 0;
	}

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
			margin: auto;
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

	&__info {
		margin-top: 20px;
	}

	&__genres {
		margin-top: 25px;

		&__box {
			font-size: 0;
		}

		&__list {
			display: inline-block;
			position: relative;
			margin-left: 8px;
			vertical-align: top;

			&:first-child {
				margin-left: 0;
			}

			&:hover {
				&:before {
					content: '';
					display: block;
					position: absolute;
					bottom: -5px;
					left: 0;
					width: 100%;
					height: 1px;
					background: #FFF;
				}
			}

			a {
				display: block;
				font-size: 18px;
				color: #DFDFDF;
			}
		}
	}

	&__overview {
		margin-top: 35px;
		font-size: 14px;
		color: #A9A9A9;
		line-height: 24px;
		word-break: keep-all;
		word-wrap: break-word;
	}

	.recommendation {
		&__section {
			margin-top: 100px;
		}

		&__wrapper {
			margin-top: 30px;
		}

		&__box {
			font-size: 0;
		}

		&__list {
			display: inline-block;
			width: 295px;
			margin: 40px 0 0 20px;
			vertical-align: top;

			&:nth-child(-n + 4) {
				margin-top: 0;
			}

			&:nth-child(4n + 1) {
				margin-left: 0;
			}
		}

		&__img {
			overflow: hidden;
			position: relative;
			font-size: 0;

			&:before {
				content: '';
				display: block;
				padding-top: 150%;
			}

			img {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				width: 100%;
				height: auto;
				margin: auto;
			}
		}

		&__info {
			margin-top: 14px;

			&__title {
				display: block;
				overflow: hidden;
				font-size: 18px;
				font-weight: 500;
				color: #FFF;
				line-height: 27px;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			&__desc {
				overflow: hidden;
				height: 40px;
				margin-top: 10px;
				font-size: 14px;
				color: #FFF;
				line-height: 20px;
				display: -webkit-box;
				white-space: norma;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
		}
	}
}

</style>