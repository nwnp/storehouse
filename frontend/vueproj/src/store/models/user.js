import api from '../apiUtil'

// 초기값 선언
const stateInit = {
  User: {
    id: null,
    departmentId: null,
    name: null,
    userid: null,
    password: null,
    role: null,
    email: null,
    phone: null,
    updatedPwDate: null,
    createdAt: null,
    updatedAt: null
  }
}

export default {
  state: {
    UserList: [],
    User: { ...stateInit.User },
    InsertedResult: null,
    UpdatedResult: null,
    DeletedResult: null,
    InputMode: null
  },
  getters: {
    UserList: state => state.UserList,
    User: state => state.User,
    UserInsertedResult: state => state.InsertedResult,
    UserUpdatedResult: state => state.UpdatedResult,
    UserDeletedResult: state => state.DeletedResult,
    UserInputMode: state => state.InputMode
  },
  mutations: {
    setUserList(state, data) {
      state.UserList = data
    },
    setUser(state, data) {
      state.User = data
    },
    setInsertedResult(state, data) {
      state.InsertedResult = data
    },
    setUpdatedResult(state, data) {
      state.UpdatedResult = data
    },
    setDeletedResult(state, data) {
      state.DeletedResult = data
    },
    setInputMode(state, data) {
      state.InputMode = data
    }
  },
  actions: {
    // 리스트 조회
    actUserList(context, payload) {
      /* 테스트 데이터 세팅 */
      const UserList = [
        {
          id: 1,
          departmentId: 1,
          name: '홍길동',
          userid: 'hong',
          role: 'leader',
          email: 'hong@email.com',
          phone: '010-1234-5678',
          createdAt: '2021-12-01T00:00:00.000Z',
          Department: { id: 1, name: '개발팀', code: 'dev', createdAt: '2021-12-01T00:00:00.000Z' }
        },
        {
          id: 2,
          departmentId: 2,
          name: '김길동',
          userid: 'kim',
          role: 'member',
          email: 'kim@email.com',
          phone: '010-9876-5432',
          createdAt: '2021-12-01T00:00:00.000Z',
          Department: { id: 2, name: '영업팀', code: 'sales', createdAt: '2021-12-01T00:00:00.000Z' }
        }
      ]
      context.commit('setUserList', UserList)

      /* RestAPI 호출 */
      /*
      api.get('/serverApi/users').then(response => {
        const UserList = response && response.data
        context.commit('setUserList', UserList)
      })
      */
    },
    // 등록
    actUserInsert(context, payload) {
      // 상태값 초기화
      context.commit('setInsertedResult', null)

      /* 테스트 데이터 세팅 */
      setTimeout(() => {
        const insertedResult = 1
        context.commit('setInsertedResult', insertedResult)
      }, 300) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.

      /* RestAPI 호출 */
      /*
      api.post('/serverApi/users').then(response => {
        const insertedResult = response && response.insertedId
        context.commit('setInsertedResult', insertedResult)
      })
      */
    },
    // 초기화
    actUserInit(context, payload) {
      context.commit('setUser', { ...stateInit.User })
    },
    // 입력모드
    actUserInputMode(context, payload) {
      context.commit('setInputMode', payload)
    },
    // 상세정보 조회
    actUserInfo(context, payload) {
      // 상태값 초기화
      context.commit('setUser', { ...stateInit.User })

      /* 테스트 데이터 세팅 */
      setTimeout(() => {
        const UserList = [
          {
            id: 1,
            departmentId: 1,
            name: '홍길동',
            userid: 'hong',
            role: 'leader',
            email: 'hong@email.com',
            phone: '010-1234-5678',
            updatedPwDate: '2021-12-01T00:00:00.000Z',
            createdAt: '2021-12-01T00:00:00.000Z',
            Department: { id: 1, name: '개발팀', code: 'dev', createdAt: '2021-12-01T00:00:00.000Z' }
          },
          {
            id: 2,
            departmentId: 2,
            name: '김길동',
            userid: 'kim',
            role: 'member',
            email: 'kim@email.com',
            phone: '010-9876-5432',
            updatedPwDate: '2021-12-01T00:00:00.000Z',
            createdAt: '2021-12-01T00:00:00.000Z',
            Department: { id: 2, name: '영업팀', code: 'sales', createdAt: '2021-12-01T00:00:00.000Z' }
          }
        ]

        let User = { ...stateInit.User }
        for (let i = 0; i < UserList.length; i += 1) {
          if (payload === UserList[i].id) {
            User = { ...UserList[i] }
          }
        }
        context.commit('setUser', User)
      }, 300)

      /* RestAPI 호출 */
      /*
      api.get('/serverApi/users/${payload}').then(response => {
        const User = response && response.user
        context.commit('setUser', User)
      })
      */
    },
    // 수정
    actUserUpdate(context, payload) {
      // 상태값 초기화
      context.commit('setUpdatedResult', null)

      /* 테스트 데이터 세팅 */
      setTimeout(() => {
        const updatedResult = 1
        context.commit('setUpdatedResult', updatedResult)
      }, 300) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.

      /* RestAPI 호출 */
      /*
      api.put('/serverApi/users/${payload}').then(response => {
        const updatedResult = response && response.updatedCount
        context.commit('setUpdatedResult', updatedResult)
      })
      */
    },
    // 삭제
    actUserDelete(context, payload) {
      // 상태값 초기화
      context.commit('setDeletedResult', null)

      /* 테스트 데이터 세팅 */
      setTimeout(() => {
        const deletedResult = 1
        context.commit('setDeletedResult', deletedResult)
      }, 300) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.

      /* RestAPI 호출 */
      /*
      api.delete('/serverApi/users/${payload}').then(response => {
        const deletedResult = response && response.deletedCount
        context.commit('setDeletedResult', deletedResult)
      })
      */
    }
  }
}
