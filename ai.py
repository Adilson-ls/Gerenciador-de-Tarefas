import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import os

# --- 1. GERAÇÃO DA FONTE DE DADOS (Critério II-b) ---
# Para garantir que o projeto seja autossuficiente, vamos gerar o CSV via código.
# Em um cenário real, você carregaria um arquivo existente.

def gerar_dataset():
    data = {
        'Anos_Experiencia': [1.1, 1.3, 1.5, 2.0, 2.2, 2.9, 3.0, 3.2, 3.2, 3.7, 
                             3.9, 4.0, 4.0, 4.1, 4.5, 4.9, 5.1, 5.3, 5.9, 6.0, 
                             6.8, 7.1, 7.9, 8.2, 8.7, 9.0, 9.5, 9.6, 10.3, 10.5],
        'Salario': [39343, 46205, 37731, 43525, 39891, 56642, 60150, 54445, 64445, 57189, 
                    63218, 55794, 56957, 57081, 61111, 67938, 66029, 83088, 81363, 93940, 
                    91738, 98273, 101302, 113812, 109431, 105582, 116969, 112635, 122391, 121872]
    }
    df = pd.DataFrame(data)
    df.to_csv('dataset_salarios.csv', index=False)
    print("Arquivo 'dataset_salarios.csv' gerado com sucesso.")
    return df

# --- 2. CODIFICAÇÃO DO PROJETO (Critério II-c) ---

def main():
    print("--- Iniciando Projeto de Introdução à IA ---")
    
    # Carregar dados (ou criar se não existirem)
    if not os.path.exists('dataset_salarios.csv'):
        df = gerar_dataset()
    else:
        df = pd.read_csv('dataset_salarios.csv')
    
    # Separação de variáveis independentes (X) e dependentes (y)
    X = df.iloc[:, :-1].values # Anos de Experiência
    y = df.iloc[:, 1].values   # Salário

    # Divisão em Treino e Teste
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)

    # Criação e Treinamento do Modelo (Regressão Linear Simples)
    regressor = LinearRegression()
    regressor.fit(X_train, y_train)

    # Realizando Previsões
    y_pred = regressor.predict(X_test)

    # Exibição de Métricas
    print("\n--- Resultados do Modelo ---")
    print(f"Coeficiente (Inclinação): {regressor.coef_[0]:.2f}")
    print(f"Intercepto (Viés): {regressor.intercept_:.2f}")
    print(f"Erro Médio Quadrático (MSE): {mean_squared_error(y_test, y_pred):.2f}")
    print(f"Acurácia (R2 Score): {r2_score(y_test, y_pred):.2f}")

    # --- 3. GERAÇÃO DE VISUALIZAÇÕES (Critério II-b) ---
    print("\nGerando gráfico de visualização...")
    
    plt.figure(figsize=(10, 6))
    
    # Plotar dados de treino (azul) e teste (verde)
    plt.scatter(X_train, y_train, color='blue', label='Dados de Treino')
    plt.scatter(X_test, y_test, color='green', label='Dados de Teste (Reais)')
    
    # Plotar a linha de regressão (previsão)
    plt.plot(X_train, regressor.predict(X_train), color='red', linewidth=2, label='Linha de Regressão')
    
    plt.title('Salário vs Anos de Experiência (Regressão Linear)')
    plt.xlabel('Anos de Experiência')
    plt.ylabel('Salário (R$)')
    plt.legend()
    plt.grid(True, linestyle='--', alpha=0.6)
    
    # Salvar a visualização
    plt.savefig('grafico_previsao.png')
    print("Visualização salva como 'grafico_previsao.png'.")
    print("\nProcesso concluído.")

if __name__ == "__main__":
    main()