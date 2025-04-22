(define-contract liquidity-token
  (variable token-name (string-ascii 32) "Liquidity Pool Token")
  (variable token-symbol (string-ascii 8) "LPT")
  (variable decimals uint 8)
  (variable total-supply uint 0)
  (variable balances { principal: uint } )

  (define-read-only (get-name)
    (var-get token-name)
  )

  (define-read-only (get-symbol)
    (var-get token-symbol)
  )

  (define-read-only (get-decimals)
    (var-get decimals)
  )

  (define-read-only (get-total-supply)
    (var-get total-supply)
  )

  (define-read-only (get-balance (who principal))
    (default-to u0 (map-get? balances who))
  )

  (define-public (mint (recipient principal) (amount uint))
    (begin
      (asserts! (> amount u0) (err u500))
      (try! (increase-supply amount))
      (try! (increase-balance recipient amount))
      (ok true)
    )
  )

  (define-public (transfer (sender principal) (recipient principal) (amount uint))
    (begin
      (asserts! (> amount u0) (err u500))
      (try! (decrease-balance sender amount))
      (try! (increase-balance recipient amount))
      (ok true)
    )
  )

  (define-private (increase-supply (amount uint))
    (var-set total-supply (+ amount (var-get total-supply)))
    (ok (var-get total-supply))
  )

  (define-private (decrease-supply (amount uint))
    (var-set total-supply (- (var-get total-supply) amount))
    (ok (var-get total-supply))
  )

  (define-private (increase-balance (recipient principal) (amount uint))
    (let ((current-balance (get-balance recipient)))
      (map-set balances recipient (+ current-balance amount))
    )
  )

  (define-private (decrease-balance (sender principal) (amount uint))
    (let ((current-balance (get-balance sender)))
      (asserts! (>= current-balance amount) (err u501))
      (map-set balances sender (- current-balance amount))
    )
  )

  (define-constant err-insufficient-balance u501)
  (define-constant err-invalid-amount u500)
)
