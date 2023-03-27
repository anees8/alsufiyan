<template>
  <div class="menu-item" :class="{ expanded: expanded }">
    <RouterLink
      v-if="name"
      v-show="userLogin.permissions && userLogin.permissions.includes(Permissions)"
      class="nav-link text-dark"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      v-bind:title="label"
      v-on:click="togggleMenu()"
      v-bind:to="{ name: name }"
    >
      <div class="label d-flex align-items-center justify-content-between">
        <div>
          <font-awesome-icon class="me-4" v-if="icon && !smallMenu" :icon="icon" />
          <font-awesome-icon v-if="icon && smallMenu" :icon="icon" class="ms-2" />

          <span v-if="showLabel">{{ label }} </span>
        </div>
        <div v-if="data ? data.length > 0 : false" class="right">
          <font-awesome-icon
            class="ms-2"
            :class="{ 'fa-rotate-180 ': expanded }"
            icon="chevron-down"
          />
        </div>
      </div>
    </RouterLink>

    <li
      v-else
      v-show="
        userLogin.permissions &&
        Permissions.split(',').some((p) => userLogin.permissions.includes(p))
      "
      class="nav-link text-dark"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      v-bind:title="label"
      v-on:click="togggleMenu()"
    >
      <div class="label d-flex align-items-center justify-content-between">
        <div>
          <font-awesome-icon class="me-4" v-if="icon && !smallMenu" :icon="icon" />
          <font-awesome-icon v-if="icon && smallMenu" :icon="icon" class="ms-2" />

          <span v-if="showLabel">{{ label }} </span>
        </div>
        <div v-if="data ? data.length > 0 : false" class="right">
          <font-awesome-icon
            class="ms-2"
            :class="{ 'fa-rotate-180 ': expanded }"
            icon="chevron-down"
          />
        </div>
      </div>
    </li>
    <div
      v-show="showChildren"
      class="items-container"
      :class="{ 'small-menu': smallMenu }"
      ref="container"
      :style="{ height: containerHeight }"
    >
      <menu-item
        v-for="(item, index) in data"
        :key="index"
        :label="item.label"
        :icon="item.icon"
        :name="item.name"
        :depth="depth + 0"
        :Permissions="item.Permissions"
        :data="item.children"
        :smallMenu="smallMenu"
      ></menu-item>
    </div>
  </div>
</template>

<script>
import { useLoginStore } from "../../../stores/admin/loginStore";

export default {
  name: "menu-item",
  setup: () => {
    return {
      userLogin: useLoginStore(),
    };
  },
  data: () => ({ showChildren: false, expanded: false, containerHeight: 0 }),

  props: {
    label: { type: String, required: true },
    Permissions: { type: String },
    icon: { type: String },
    depth: { type: Number, required: true },
    name: { type: String },

    data: { type: Array },
    smallMenu: { type: Boolean },
  },
  computed: {
    showLabel() {
      return this.smallMenu ? this.depth > 0 : true;
    },
  },
  methods: {
    togggleMenu() {
      this.expanded = !this.expanded;
      if (!this.showChildren) {
        this.showChildren = true;
        this.$nextTick(() => {
          this.containerHeight = this.$refs["container"].scrollHeight + "px";
          this.containerHeight = "fit-content";
          this.$refs["container"].style.overflow = "visible";
        });
      } else {
        this.$refs["container"].style.overflow = "hidden";
        this.containerHeight = this.$refs["container"].scrollHeight + "px";
        this.containerHeight = 0 + "px";
        this.showChildren = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.menu-item {
  position: relative;
  width: 100%;
  .router-link-exact-active {
    > div {
      background-color: var(--primary);
      cursor: pointer;
    }

    .label {
      color: var(--tertiary);
      font-awesome-icon {
        color: var(--dark);
      }
    }
  }

  .label {
    white-space: nowrap;
    user-select: none;
    height: 3rem;
    padding: 0 1.25rem;
    box-sizing: border-box;
    color: var(--primary);

    font-awesome-icon {
      padding-right: 0.2rem;
      font-size: 1.5rem;
      color: var(--primary);
      transition: all 0.3s ease;
      &.expand {
        // transition: all 0.5s ease;
        font-size: 1.5rem;
        color: var(--primary);

        &.expanded {
          //  transition: all 0.5s ease;
          transform: rotate(180deg);
        }
      }
    }

    &:hover {
      transition: all 0.5s ease;
      background-color: var(--primary);
      color: var(--tertiary);
      cursor: pointer;
      font-awesome-icon {
        color: var(--tertiary);
      }
    }

    &.small-menu {
      transition: all 0.5s ease;
      width: fit-content;
    }
  }

  .items-container {
    transition: all 0.5s ease;
    transition: all;
    &.small-menu {
      transition: all 0.5s ease;
      position: relative;
      .label {
        width: 100%;
      }
    }
  }
}
</style>
