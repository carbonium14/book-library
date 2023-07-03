<template>
  <div>
    <div class="evaluate-list" ref="evalLstRef">
      <div class="evaluate-item" v-for="(item, index) in evalRplLst" :key="item.evaluateid">
        <div class="evaluate-item-user">
          <span class="img-wrapper">
            <img class="headerportimg" :src="getImg(item.headportrai)" alt="头像">
          </span>
          <span class="evaluator">{{ item.isanonymous === 0 ? item.evaluator : '匿名用户' }}</span>
          <span class="givealike">
            <font-awesome-icon icon="fa-regular fa-thumbs-up" class="like" />
            {{ item.givealikenum }}
          </span>
        </div>
        <div class="evaluate-item-star">
          <span class="icon">
            <img class="starimg" v-for="(star, index) in [0, 0, 0, 0, 0]" :key="index" :src="getImg('redstar.png')" alt="好评">
          </span>
          <span class="line">&nbsp;|&nbsp;</span>
          <span class="star-score">10分</span>
        </div>
        <div class="evaluate-item-content">
          {{ item.content }}
          <div class="reply-action">
            <span class="date">{{ String(item.pubdate).substring(0, 10) }}</span>
            <span class="reply-to-evaluate">
              <span class="replyinfo">
                <span class="reply" @click="(e) => reply(e, index)" v-show="cancelRplShowIndx === -1">回复</span>
                <font-awesome-icon icon="fa-regular fa-comment-dots" class="reply-icon" v-show="cancelRplShowIndx === -1"/>
                <span class="cancelreply" @click="(e) => cancelreply(e)" v-show="cancelRplShowIndx === index">取消回复</span>
              </span>
              <div class="reply-panel">
                <div class="overlay-before" ref="overlayEle"></div>
                <div class="publish-area">
                  <textarea class="reply-content" :placeholder="'回复' + item.evaluator"></textarea>
                  <span class="publish" @click="(e) => addReply(e, item.evaluateid)">发表</span>
                </div>
                <div class="overlay-after"></div>
              </div>
            </span>
          </div>
          <div class="replylst">
            <div class="reply" v-for="reply in showReplyLst(item)" :key="reply.replyid">
              <span class="replyor">{{ reply.replyor }}:</span>
              <span class="reply-content">{{ reply.replycontent }}</span>
            </div>
            <div class="allreply">
              <span v-show="isEmpty(item.replyLst)">暂无回复</span>
              <span v-show="isReadyOpen(item)" @click="foldRplLst(item)">展开{{ item.replyLst.length }}条回复</span>
            </div>
            <div class="reply" v-show="isReadyCollapse(item)" @click="collapseRplLst(item)">
              收起
              <font-awesome-icon icon="fa-solid fa-chevron-up" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="evaluate-list" v-show="evalRplLst.length === 0">
      <div class="noevaluate">暂无评价</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import getImg from '../../../../../utils/imgUtil'
import EvaluateClass from '../../../service/evaluate'
import ReplyClass from '../../../service/reply'
import { watchEffect } from 'vue'
const { evalRplLst, reply, cancelreply, cancelRplShowIndx } = EvaluateClass
const { showReplyLst, foldRplLst, collapseRplLst, isReadyCollapse, isEmpty, isReadyOpen, addReply, initRplLst } = ReplyClass
watchEffect(() => {
  initRplLst(evalRplLst.value)
})
</script>

<style lang="scss" scoped>
.evaluate-list {
  width: 4.6rem;
  display: grid;
  gap: 0.5rem;
  .evaluate-item {
    width: 100%;
    display: grid;
    gap: 0.25rem;
    &-user {
      display: flex;
      align-items: center;
      gap: 0.2rem;
      .img-wrapper {
        width: 0.4rem;
        height: 0.5rem;
        .headerportimg {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      .evaluator {
        flex: 1;
      }
      .givealike {
        .like {
          font-size: 0.3rem;
        }
      }
    }
    &-star {
      display: flex;
      align-items: center;
      gap: 0.1rem;
      line-height: 0.35rem;
      .icon {
        width: 1.6rem;
        .starimg {
          width: 20%;
          height: 100%;
          object-fit: contain;
        }
      }
      .line {
        position: relative;
        top: -0.03rem;
        color: gray;
      }
      .star-score {
        color: #d8596c;
        position: relative;
        top: -0.02rem;
      }
    }
    &-content {
      font-size: 0.2rem;
      text-shadow: 0rem 0rem 0.01rem gray;
      .reply-action {
        display: flex;
        align-items: center;
        margin-top: 0.07rem;
        .date {
          color: #a1a1a1;
          font-size: 0.17rem;
        }
        .reply-to-evaluate {
          flex: 1;
          text-align: right;
          position: relative;
          .replyinfo {
            font-size: 0.16rem;
            .reply {
              margin-right: 0.1rem;
            }
            .reply-icon {
              position: relative;
              top: 0.015rem;
              font-size: 0.2rem;
            }
          }
          .reply-panel {
            display: none;
          }
          .reply-panel-show {
            display: block;
            position: absolute;
            top: 0.3rem;
            right: 0;
            z-index: 3;
            height: 2.2rem;
            width: 4.8rem;
            background-color: #fff;
            .publish-area {
              display: flex;
              align-items: center;
              width: 4.5rem;
              height: 100%;
              padding: 0rem 0.15rem;
              gap: 0.1rem;
              .reply-content {
                flex: 1;
                height: 80%;
                width: 4rem;
                padding: 0.15rem;
                background-color: #f1f1f1;
                border: none;
                outline: none;
                resize: none;
              }
              .publish {
                width: 0.5rem;
                flex-basis: 0.5rem;
                text-align: center;
                color: #bcc2f6;
                -webkit-tap-highlight-color: blue;
              }
            }
            .overlay-before {
              position: absolute;
              top: -6rem;
              width: 5rem;
              height: 4rem;
              background-color: #fff;
              opacity: 0.6;
            }
            .overlay-after {
              position: absolute;
              top: 2.2rem;
              width: 5rem;
              height: 50vh;
              background-color: #fff;
              opacity: 0.6;
            }
          }
        }
      }
      .replylst {
        margin-top: 0.2rem;
        line-height: 0.5rem;
        width: 4.6rem;
        background-color: #f6f6f6;
        font-size: 0.2rem;
        .reply {
          .replyor {
            color: #526198;
          }
          &-content {
            font-family: '楷体';
          }
        }
      }
    }
  }
  .noevaluate {
    text-align: center;
    font-size: 0.4rem;
    color: #a1a1a1;
  }
}
.evaluate-list::after {
  content: '';
  display: block;
  height: 1rem;
}
</style>