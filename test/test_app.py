import pytest
from api.app import app as flask_app


@pytest.fixture
def app():
    # Provide app instance for testing
    yield flask_app


@pytest.fixture
def client(app):
    # Simulate HTTP requests without actually running server
    return app.test_client()


def test_results_endpoint(client):
    response = client.get("/results")
    assert response.status_code == 200
