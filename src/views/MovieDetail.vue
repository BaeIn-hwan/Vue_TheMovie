<template>
	<section class="movie-detail">
		<h2 class="blind">영화상세</h2>

		<template v-if="loading.movieInfoLoding == true">
			<section class="movie-detail__view">
				<h3 class="blind">영화 상세정보</h3>

				<figure class="movie-detail__thumb">
					<img :src="$store.state.imgURL +'/w400'+ movieInfo.poster_path" alt="">
				</figure>

				<div class="movie-detail__info">
					<!-- 컨텐츠 제목 -->
					<h3 class="movie-detail__title">
						{{movieInfo.title}}<br>({{movieInfo.original_title}})
					</h3>

					<!-- 컨텐츠 장르 -->
					<div class="movie-detail__genres">
						<ul class="movie-detail__genres__box">
							<li class="movie-detail__genres__list" v-for="(genres) in movieInfo.genres" :key="genres.id">
								<a href="#" class="movie-detail__genres__link" @click.prevent="">{{genres.name}}</a>
							</li>
						</ul>
					</div>

					<!-- 상영시간 및 개봉일 -->
					<div class="movie-detail__etc">
						<ul class="movie-detail__etc__box">
							<li class="movie-detail__etc__list">
								<span class="movie-detail__etc__title">상영시간</span>
								<span class="movie-detail__etc__desc">{{korTime}}</span>
							</li>

							<li class="movie-detail__etc__list">
								<span class="movie-detail__etc__title">개봉일</span>
								<span class="movie-detail__etc__desc">{{movieInfo.release_date}}</span>
							</li>
						</ul>
					</div>

					<!-- 컨텐츠 설명 -->
					<p class="movie-detail__desc">{{movieInfo.overview}}</p>
				</div>
			</section>
		</template>

		<template v-if="loading.moviePeopleLoding == true">
			<section class="movie-detail__step">
				<div class="movie-detail__header">
					<h3 class="movie-detail__header__title">주요 출연진</h3>
					<button type="button" class="movie-detail__step__btn-more">전체보기 +</button>
				</div>

				<div class="movie-detail__step__wrapper">
					<ul class="movie-detail__step__box">
						<template v-for="(cast, index) in moviePeople.cast">
							<li class="movie-detail__step__list" :key="index" v-if="index < 10">
								<a href="#">
									<figure class="movie-detail__step__img">
										<img :src="$store.state.imgURL +'/w200'+ cast.profile_path" :alt="cast.original_name">
									</figure>

									<div class="movie-detail__step__name">
										<span class="movie-detail__step__name-character">{{cast.character}}</span>
										<span class="movie-detail__step__name-origin">{{cast.original_name}}</span>
									</div>
								</a>
							</li>
						</template>
					</ul>
				</div>
			</section>
		</template>
	</section>
</template>

<script>
export default {
	name: "MovieDetail",
	data() {
		return {
			loading: {
				movieInfoLoding: false,
				moviePeopleLoding: false,
			},
			parameters: {
				movieID: "",
			},
			movieInfo: null,
			moviePeople: null,
		}
	},
	computed: {
		korTime() {
			const minuteRunTime = this.movieInfo.runtime;

			let hours =  Math.floor(minuteRunTime % 3600 / 60),
					minutes = Math.floor(minuteRunTime % 60);

			return `${hours}:${minutes}`;
		}
	},
	beforeCreate() {
		
	},
	created() {
		this.parameters.movieID = this.$route.params.id;
		this.requestMovieInfo();
		this.requestMoviePeople();
	},
	methods: {
		/*
			@ 감독 및 제작진 API
		*/
		async requestMovieInfo() {
			try {
				const response = await this.$store.dispatch("requestMethod", {
					method: "GET",
					url: `/movie/${this.parameters.movieID}`,
					data: {
						language: "KO"
					}
				});

				if (response && response.data) {
					this.loading.movieInfoLoding = true;
					this.movieInfo = response.data;
				}
			}
			catch(e) {
				this.loading.movieInfoLoding = 'error'
				console.error("error", e);
			}
		},
		/*
			@ 감독 및 제작진 API
		*/
		async requestMoviePeople() {
			try {
				const response = await this.$store.dispatch("requestMethod", {
					method: "GET",
					url: `/movie/${this.parameters.movieID}/credits`,
					data: {
						language: "KO"
					}
				});

				if (response && response.data) {
					this.loading.moviePeopleLoding = true;
					this.moviePeople = response.data;
					console.log(this.moviePeople)
				}
			}
			catch(e) {
				console.error("error", e);
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.movie-detail {
	max-width: 1280px;
	margin: 0 auto;
	padding: 25px 20px 0;

	&__header {
		position: relative;

		&__title {
			font: {
				size: 32px;
				weight: 600;
			};
			color: #FFF;
		}
	}

	&__view {
		&:after {
			content: '';
			display: block;
			clear: both;
		}
	}

	&__thumb {
		float: left;
		width: 400px;

		img {
			width: 100%;
		}
	}

	&__info {
		float: right;
		width: 750px;
	}

	&__title {
		font: {
			size: 36px;
			weight: 600;
		}
		color: #FFF;
		line-height: 46px;
		word-break: keep-all;
		word-wrap: break-word;
	}

	&__genres {
		widows: 100%;
		margin-top: 25px;

		&__box {
			margin: -5px;
			font-size: 0;
		}

		&__list {
			display: inline-block;
			margin: 5px;
			vertical-align: top;

			&:hover {
				.movie-detail__genres__link {
					font-weight: 600;
				}
			}
		}

		&__link {
			display: block;
			padding: 10px 20px;
			border-radius: 17px;
			background: #FFF;
			font-size: 14px;
			color: #000;
		}
	}

	&__etc {
		margin-top: 30px;

		&__box {
			font-size: 0;
		}

		&__list {
			display: inline-block;
			position: relative;
			margin-left: 20px;
			padding-left: 22px;
			vertical-align: top;

			&:before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				width: 1px;
				height: 100%;
				background: #FFF;
			}

			&:first-child {
				margin-left: 0;
				padding-left: 0;

				&:before {
					display: none;
				}
			}

			span {
				display: inline-block;
				margin-left: 10px;
				font-size: 16px;
				color: #FFF;
				vertical-align: top;
				
				&:first-child {
					margin-left: 0;
				}

				&.movie-detail__etc__title {
					font-weight: 600;
				}
			}
		}
	}

	&__desc {
		margin-top: 30px;
		font-size: 14px;
		color: #FFF;
		line-height: 28px;
	}

	&__step {
		position: relative;
		margin-top: 100px;

		&__btn {
			&-more {
				position: absolute;
				top: 0;
				right: 0;
				font-size: 16px;
				color: #FFF;
			}
		}

		&__wrapper {
			margin-top: 35px;
		}

		&__box {
			font-size: 0;
		}

		&__list {
			display: inline-block;
			width: 200px;
			margin: 30px 0 0 60px;
			vertical-align: top;

			&:nth-child(-n + 5) {
				margin-top: 0;
			}

			&:nth-child(5n + 1) {
				margin-left: 0;
			}
		}

		&__img {
			overflow: hidden;
			position: relative;
			height: 300px;

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

		&__name {
			margin-top: 15px;

			span {
				display: block;
				color: #FFF;
				word-break: keep-all;
				word-wrap: break-word;
			}

			&-character {
				font-size: 16px;
				line-height: 20px;
			}

			&-origin {
				margin-top: 10px;
				font-size: 14px;
				line-height: 18px;
			}
		}
	}
}
</style>