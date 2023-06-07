// 세션 인증 확인 함수
export const checkAuth = (req, res, next) => {
    if (req.session.user_id) {
      // 세션에 사용자 ID가 존재하는 경우
      next(); // 다음 미들웨어 실행
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  }
  
  export const getAuth = () => {
    try {
        if(req.session.user_id) {
            return {
                isLogin: true,
                user_id: req.session.user_id,
            }
        }else {
            return {
                isLogin: false
            }
        }
    }catch(err) {
        next(err)
    }
  }