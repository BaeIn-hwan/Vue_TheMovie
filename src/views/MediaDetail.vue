<template>
	<div class="movie-detail">
		<template v-if="loading.mediaDetail == true">
			<section class="movie__section movie-detail__section">
					<section class="movie-detail__top">
						<figure class="movie-detail__thumb">
							<img :src="`${$store.state.imgURL}/w300_and_h450_bestv2${mediaDetail.poster_path}`" alt="">
						</figure>

						<div class="movie-detail__detail">
							<h2 class="movie-detail__title">
								<span>
									{{mediaDetail.title || mediaDetail.name}}
									<template v-if="getYear">
										({{getYear}})
									</template>
								</span>
							</h2>

							<div class="movie-detail__info">
								<ul class="movie-detail__genres__box">
									<template v-if="mediaDetail.genres && mediaDetail.genres.length">
										<li class="movie-detail__genres__list" v-for="(word, index) in mediaDetail.genres" :key="index">
											<a href="#" @click.prevent>{{word.name}}<template v-if="index != mediaDetail.genres.length - 1">,</template></a>
										</li>
									</template>
								</ul>

								<template v-if="mediaDetail.runtime">
									<span class="movie-detail__runtime">/ {{mediaDetail.runtime}}분</span>
								</template>
							</div>

							<p class="movie-detail__overview">{{mediaDetail.overview != "" ? mediaDetail.overview : "상세 설명이 없습니다."}}</p>
						</div>
					</section>
			</section>
		</template>

		<template v-if="loading.credits == true">
			<section class="movie__section credits">
				<div class="movie__header">
					<h2 class="movie__title">
						<span>출연진</span>
					</h2>
				</div>

				<div class="credits__wrapper">
					<ul class="credits__box">
						<template v-if="creditsList.cast && creditsList.cast.length">
							<li class="credits__list" v-for="(cast, index) in creditsList.cast" :key="index">
								<figure class="credits__img">
									<img alt="" v-lazy="`${$store.state.imgURL}/w138_and_h175_face${cast.profile_path}`">
								</figure>

								<div class="credits__info">
									<span class="credits__info__name credits__info__name-origin">{{cast.name}}</span>
									<span class="credits__info__name credits__info__name-character">{{cast.character}}</span>
								</div>
							</li>
						</template>
					</ul>
				</div>
			</section>
		</template>

		<template v-if="loading.mediaDetail == true">
			<template v-if="mediaDetail.seasons && mediaDetail.seasons.length">
				<section class="movie__section seasons">
					<div class="movie__header">
						<h2 class="movie__title">
							<span>SEASONS</span>
						</h2>
					</div>

					<div class="seasons__wrapper">
						<ul class="seasons__box">
							<template v-for="(season, index) in mediaDetail.seasons">
								<li class="seasons__list" v-if="index < parameters.mediaParams.seasonPage" :key="index">
									<a href="#" class="seasons__link" @click.prevent>
										<figure class="seasons__img">
											<img :alt="season.name" v-lazy="`${$store.state.imgURL}/w130_and_h195_bestv2${season.poster_path}`">
										</figure>
										
										<div class="seasons__info">
											<span class="seasons__info__title">{{mediaDetail.name}} {{season.name}}</span>
											<p class="seasons__info__overview">
												{{mediaDetail.overview != "" ? mediaDetail.overview : "상세 설명이 없습니다."}}
											</p>
										</div>
									</a>
								</li>
							</template>
						</ul>

						<div class="movie__btn h-center more-type" v-if="parameters.mediaParams.seasonPage < mediaDetail.seasons.length">
							<button type="button" @click="moreSeason()">더보기</button>
						</div>
					</div>
				</section>
			</template>
		</template>

		<template v-if="loading.recommendation == true">
			<template v-if="recommendationList && recommendationList.length">
				<section class="movie__section recommendation">
					<div class="movie__header">
						<h2 class="movie__title">
							<span>RECOMMENDATIONS</span>
						</h2>
					</div>

					<SlideItemComponent :listType="mediaInfo.type" :listData="recommendationList" :loading="loading.recommendation" ref="recommendationComponent" />
				</section>
			</template>
		</template>
	</div>
</template>

<script>
export default {
	name: "MovieDetail",

	data() {
		return {
			mediaInfo: {
				id: 0,
				type: 'movie'
			},
			loading: {
				mediaDetail: false,
				credits: false,
				recommendation: false,
			},
			parameters: {
				mediaParams: {
					language: "ko-KR",
					seasonPage: 4,
				},
				creditParams: {
					language: "ko-KR",
				},
				recommendationParams: {
					language: "ko-KR",
					page: 1,
				}
			},
			mediaDetail: null,
			creditsList: null,
			recommendationList: null,
		}
	},

	// beforeRouteUpdate(to, from, next) {
	// 	// console.log(to, from, next)
  //   // react to route changes...
  //   // don't forget to call next()
  // },

	watch: {
		$route(newValue) {
			this.mediaInfo = newValue.params;
			this.requestMediaDetail();
			this.requestCredits();
			this.requestRecommendations();
		}
	},

	computed: {
		getYear() {
			let date = this.mediaDetail.release_date || this.mediaDetail.first_air_date;
			
			if (date) {
				return date.split("-")[0]
			}
			else {
				return "";
			}
			
		}
	},

	created() {
		this.mediaInfo = this.$route.params;
		this.requestMediaDetail();
		this.requestCredits();
		this.requestRecommendations();
	},

	methods: {
		async requestMediaDetail() {
			try {
				const response = await this.$store.dispatch("requestMethod", {
					method: "GET",
					url: `/${this.mediaInfo.type}/${this.mediaInfo.id}`,
					data: this.parameters.mediaParams
				});

				console.log("requestMediaDetail", response.data)
				if (response && response.data) {
					this.loading.mediaDetail = true;
					this.mediaDetail = response.data;
				}
				else {
					this.mediasDetail = {};
				}
			}
			catch(e) {
				this.loading.mediaDetail = 'error';
				console.error("error", e);
			}
		},
		async requestCredits() {
			try {
				const response = await this.$store.dispatch("requestMethod", {
					method: "GET",
					url: `/${this.mediaInfo.type}/${this.mediaInfo.id}/credits`,
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
					url: `/${this.mediaInfo.type}/${this.mediaInfo.id}/recommendations`,
					data: this.parameters.creditParams
				});

				console.log("requestRecommendations", response.data)

				if (response && response.data && response.data.results && response.data.results.length) {
					this.loading.recommendation = true;
					this.recommendationList = response.data.results.slice(0, 20);

					this.$nextTick(function() {
						if (5 < this.recommendationList.length) {
							this.$refs.recommendationComponent.itemSlider();
						}
					});
				}
				else {
					this.recommendationList = [];
				}
			}
			catch(e) {
				this.loading.recommendation = 'error';
				console.error("error", e);
			}
		},
		moreSeason() {
			this.parameters.mediaParams.seasonPage += 4;
		},
		test(e) {
			console.log(e)
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
		font-size: 0;

		&__box {
			display: inline-block;
			vertical-align: top;
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
				color: #E8E8E8;
			}
		}
	}

	&__runtime {
		display: inline-block;
		margin-left: 5px;
		font-size: 18px;
		color: #E8E8E8;
		vertical-align: top;
	}

	&__overview {
		margin-top: 35px;
		font-size: 14px;
		color: #A9A9A9;
		line-height: 24px;
		word-break: keep-all;
		word-wrap: break-word;
	}

	.credits {
		margin-top: 50px;

		&__wrapper {
			overflow: hidden;
			margin-top: 20px;
		}

		&__box {
			overflow: hidden;
			overflow-x: auto;
			// margin-bottom: -17px;
			padding-bottom: 10px;
			font-size: 0;
			white-space: nowrap;
		}

		&__list {
			display: inline-block;
			width: 138px;
			margin-left: 20px;
			vertical-align: top;
			white-space: normal;

			&:first-child {
				margin-left: 0;
			}
		}

		&__img {
			overflow: hidden;
			position: relative;
			width: 138px;
			height: 175px;

			img {
				max-width: 100%;

				&[lazy="error"] {
					width: 138px;
					height: 175px;
				}
			}
		}

		&__info {
			margin-top: 15px;
			padding: 0 10px;

			&__name {
				display: block;
				color: #FFF;
				word-break: keep-all;
				word-wrap: break-word;

				&-origin {
					font: {
						size: 16px;
						weight: 600;
					};
					line-height: 20px;
				}

				&-character {
					margin-top: 5px;
					font-size: 14px;
					line-height: 18px;
				}
			}
		}
	}

	.seasons {
		margin-top: 50px;

		&__wrapper {
			margin-top: 25px;
		}

		&__box {
			font-size: 0;
		}

		&__list {
			display: inline-block;
			width: calc(50% - 15px);
			margin: 30px 0 0 30px;
			vertical-align: top;

			&:nth-child(-n + 2) {
				margin-top: 0;
			}

			&:nth-child(odd) {
				margin-left: 0;
			}
		}

		&__link {
			display: block;
			padding: 20px;
			border: 2px solid #FFF;
			border-radius: 10px;
			font-size: 0;
		}

		&__img {
			display: inline-block;
			overflow: hidden;
			width: 130px;
			position: relative;
			vertical-align: middle;

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
				max-width: 100%;
				height: auto;
				margin: auto;
			}
		}

		&__info {
			display: inline-block;
			width: calc(100% - 150px - 20px);
			margin-left: 20px;
			vertical-align: middle;

			&__title {
				display: block;
				font: {
					size: 20px;
					weight: 600;
				};
				color: #FFF;
			}

			&__overview {
				max-height: 155px;
				margin-top: 20px;
				font-size: 16px;
				line-height: 26px;
				color: #FFF;
				@include line(6);
			}
		}
	}

	.recommendation {
		margin-top: 50px;
	}
}
</style>