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
					<button type="button" class="movie-detail__step__btn-more" @click="moreStep($event, moviePeople.id);">
						전체보기 <font-awesome-icon icon="fa-solid fa-plus" />
					</button>
				</div>

				<div class="movie-detail__step__wrapper swiper" ref="step-slider">
					<ul class="movie-detail__step__box swiper-wrapper">
						<template v-for="(cast, index) in moviePeople.cast">
							<li class="movie-detail__step__list swiper-slide" :key="index" v-if="index < 10">
								<a href="#">
									<figure class="movie-detail__step__img">
										<img :src="$store.state.imgURL +'/w200'+ cast.profile_path" :alt="cast.original_name" @error="imgError($event);">
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

		<ModalComponent :title="modal.title" :width="modal.width" :height="modal.height" v-if="modal.isOpen" @modal-close="modal.isOpen = false">
      <template v-slot:default>
				<div class="all-step">
					<section class="all-step__sec">
						<span class="all-step__title">출연진</span>

						<ul class="all-step__box">
							<li class="all-step__list" v-for="(cast, index) in moviePeople.cast" :key="index">
								<figure class="all-step__img">
									<img :src="$store.state.imgURL +'/w66_and_h66_face'+ cast.profile_path" :alt="cast.original_name" @error="imgError($event);">
								</figure>

								<div class="all-step__info">
									<span class="all-step__name">{{cast.original_name}}</span>
									<span class="all-step__character">{{cast.character}}</span>
								</div>
							</li>
						</ul>
					</section>

					<section class="all-step__sec">
						<span class="all-step__title">출연진</span>

						<ul class="all-step__box">
							<li class="all-step__list" v-for="(crew, index) in moviePeople.crew" :key="index">
								<figure class="all-step__img">
									<img :src="$store.state.imgURL +'/w66_and_h66_face'+ crew.profile_path" :alt="crew.original_name" @error="imgError($event);">
								</figure>

								<div class="all-step__info">
									<span class="all-step__name">{{crew.original_name}}</span>
									<span class="all-step__job">{{crew.job}}</span>
								</div>
							</li>
						</ul>
					</section>
				</div>
      </template>
    </ModalComponent>
	</section>
</template>

<script>
import EventBus from "@/eventBus/index.js"
import common from "@/assets/js/common.js";

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
			modalStepMore: null,
			modal: {
        width: null,
        height: null,
        isOpen: false,
				title: ""
      }
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
		// EventBus.$on("open-modal", this.modalOpen);

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
				}
			}
			catch(e) {
				console.error("error", e);
			}
		},
		imgError(e) {
			common.imgError(e);
		},
		moreStep(e, id) {
			console.log("e", e)
			console.log("id", id)

			this.modal.isOpen = true;
			this.modal.title = "출연진 및 제작진";
		},

		/*
    @ params
      payload: Obejct

      커스텀 modal 함수
    */
    test(payload) {
      this.modal.isOpen = payload.isOpen;
      this.modal.width = payload.width;
      this.modal.height = payload.height;
    }
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
			width: 150px;
			vertical-align: top;
		}

		&__img {
			overflow: hidden;
			position: relative;
			height: 225px;

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

.all-step {
	width: 600px;
	margin: 0 auto;
	padding: 0 30px;

	&__sec {
		width: 250px;
		float: left;

		&:after {
			content: '';
			display: block;
			clear: both;
		}
	}

	&__title {
		display: block;
		font: {
			size: 18px;
			weight: 600;
		};
	}

	&__box {
		margin-top: 25px;
	}

	&__list {
		margin-top: 15px;

		&:first-child {
			margin-top: 0;
		}
	}

	&__img {
		display: inline-block;
		overflow: hidden;
		position: relative;
		width: 66px;
		height: 66px;
		vertical-align: middle;
	}

	&__info {
		display: inline-block;
		width: calc(100% - 76px);
		margin-left: 10px;
		vertical-align: middle;

		span {
			display: block;
		}
	}

	&__name {
		margin-bottom: 5px;
		font-size: 16px;
		color: #333;
	}

	&__character,
	&__job {
		font-size: 14px;
		color: #999;
	}
}
</style>