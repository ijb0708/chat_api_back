// 세션 인증 확인 함수
export const checkAuth = (req, res, next) => {
    if (req.session.user) {
      // 세션에 사용자 ID가 존재하는 경우
      next(); // 다음 미들웨어 실행
    } else {
      res.status(401).json({ error: "접근 권한이 없습니다." });
    }
  }
