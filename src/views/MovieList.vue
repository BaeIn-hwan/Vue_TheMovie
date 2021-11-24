<template>
	<section class="movie-list">
		<!--
			@color 사이트
			https://www.design-seeds.com/
		-->
		<div class="movie__page-header">
			<h2 class="blind">영화목록</h2>

			<nav class="movie__filter">
				<label class="movie__filter__list">
					<input type="radio" class="blind" name="popularFilter" value="popularity.desc">
					<span>인기도순</span>
				</label>

				<label class="movie__filter__list">
					<input type="radio" class="blind" name="popularFilter" value="vote_average.desc">
					<span>평점순</span>
				</label>
				
				<label class="movie__filter__list">
					<input type="radio" class="blind" name="popularFilter" value="title.desc">
					<span>타이틀순</span>
				</label>
			</nav>
		</div>

		<section class="movie-list__sec">
			<div class="movie__page-header">
				<h3 class="movie__page__sub-title">영화목록</h3>
			</div>

			<div class="movie-layout">
				<template v-if="loading.movieLoading == false">
					<div class="ladoing">로딩중..</div>
				</template>

				<template v-else-if="loading.movieLoading == true">
					<ul class="movie-layout__box">
							<li class="movie-layout__list" v-for="(item, index) in movieList" :key="index">
								<a href="#" class="movie-layout__list__link" @click.prevent="moveDetail($event, item.id);">
									<figure class="movie-layout__list__thumb">
										<img :src="$store.state.imgURL +'/w300_and_h450_face'+ item.poster_path" :alt="item.title">
										<span class="movie-layout__list__adult" v-if="item.adult">청불</span>
									</figure>

									<div class="movie-layout__list__info">
										<span class="movie-layout__list__title">
											{{item.title}}
										</span>
										<p class="movie-layout__list__desc" v-if="false">
											{{item.overview}}
										</p>
										<span class="movie-layout__list__open-date" v-if="false">
											개봉일 : {{item.release_date}}
										</span>
									</div>
								</a>
								<router-link :to="`/MovieDetail/`" ></router-link>

								<button type="button" class="movie-layout__list__preview">
									<span class="blind">미리보기</span>
								</button>
							</li>
					</ul>
				</template>

				<template v-else-if="loading.movieLoading == 'error'">
					오류입니다.
				</template>
			</div>
		</section>
	</section>
</template>

<script>
import EventBus from "@/eventBus/index.js";

export default {
	name: 'MovieList',
	data() {
		return {
			loading: {
				movieLoading: false,
			},
			parameters: {
				movieListParams: {
					language: "ko",
					page: 1,
				}
			},
			movieList: [],
			alert: {
				isOpen: true,
				msg: "테스트"
			}
		}
	},
	created() {
	},
	mounted() {
		this.requestMovieList();
	},
	methods: {
		async requestMovieList() {
			try {
				const response = await this.$store.dispatch("requestMethod", {
					method: "GET",
					url: "/discover/movie",
					data: this.parameters.movieListParams
				});

				if (response.data && response.data.results && response.data.results.length) {
					this.loading.movieLoading = true;
					this.movieList = response.data.results;
				}
				else {
					this.movieList = [];
				}
			}
			catch(e) {
				this.loading.movieLoading = "error";
				console.error("error", e);
			}
		},
		moveDetail(e, id) {
			if(id == 370172) {
				id = ""
			}

			if (id) {
				this.$router.push({
					path: `/MovieDetail/${id}`,
				});
			}
			else {
				this.alert.msg = "상세 페이지가 없습니다.";
				EventBus.$emit("open-alert", this.alert);
			}
		},
	}
}
</script>

<style lang="scss" scope>
.movie-list {
	max-width: 1280px;
	margin: 0 auto;
	padding: 25px 20px 0;

	.movie__page-header {
		.movie__filter {
			position: absolute;
			top: 50%;
			right: 0;
			transform: translate(0, -50%);
		}
	}

	&__sec {
		margin-top: 35px;
	}
}

.movie-layout {
	&__box {
		margin: -40px -20px 0;
		font-size: 0;
	}

	&__list {
		display: inline-block;
		position: relative;
		width: 280px;
		margin: 40px 20px 0;
		vertical-align: top;

		&:hover {
			.movie-layout__list__thumb {
				img {
					transform: scale(1.1);
					transition: all .5s;
				}
			}
		}

		&__thumb {
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

		&__adult {
			position: absolute;
			top: 8px;
			right: 8px;
			padding: 5px 10px;
			border-radius: 12px;
			background: red;
			font-size: 14px;
			color: #FFF;
		}

		&__info {
			margin-top: 20px;
		}

		&__title {
			display: block;
			overflow: hidden;
			font: {
				size: 20px;
				weight: 600;
			};
			color: #EEE;
			line-height: 30px;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		&__desc {
			display: -webkit-box;
			overflow: hidden;
			text-overflow: ellipsis;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			height: 40px;
			margin: 10px 0 20px;
			font-size: 15px;
			line-height: 20px;
			color: #666;
			word-break: keep-all;
			word-wrap: break-word;
		}

		&__open-date {
			display: block;
			font-size: 14px;
			color: #999;
		}

		&__preview {
			position: absolute;
			z-index: 1;
			right: 10px;
			bottom: 60px;
			width: 30px;
			height: 30px;
			border-radius: 50%;
			background: #ced4da;
		}
	}
}
</style>